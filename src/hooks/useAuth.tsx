import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from './use-toast';
import type { Database } from '@/integrations/supabase/types';

type ProfileType = Database['public']['Tables']['profiles']['Row'];
type ProfileInsertType = Database['public']['Tables']['profiles']['Insert'];

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signUpWithEmailAndPassword: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Helper function to ensure profile exists with improved error handling
  const ensureProfileExists = async (userId: string, userName?: string | null) => {
    try {
      console.log("Checking if profile exists for user:", userId);
      
      // First check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.log("No profile found or error occurred, creating one...");
        
        // If we encounter an error, attempt to create a profile
        const { data: userData, error: userError } = await supabase.auth.getUser();
        const name = userName || userData?.user?.user_metadata?.name || null;
        
        // Create profile if it doesn't exist
        const { data: insertData, error: insertError } = await supabase
          .from('profiles')
          .insert([{ 
            id: userId,
            full_name: name
          } as ProfileInsertType]);
          
        if (insertError) {
          console.error("Error creating profile:", insertError);
          
          // If insert fails, try upsert as a fallback
          const { error: upsertError } = await supabase
            .from('profiles')
            .upsert([{ 
              id: userId,
              full_name: name
            } as ProfileInsertType]);
            
          if (upsertError) {
            console.error("Upsert fallback also failed:", upsertError);
            return false;
          }
          
          console.log("Profile created via upsert fallback");
          return true;
        }
        
        console.log("Profile created successfully");
        return true;
      }
      
      console.log("Profile already exists:", profile);
      return true;
    } catch (error) {
      console.error("Unexpected error in ensureProfileExists:", error);
      return false;
    }
  };

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // First set up auth state listener to catch any auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event, newSession?.user?.id);
        
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && newSession?.user) {
          console.log("User signed in:", newSession.user.id);
          
          // Create profile in a setTimeout to avoid auth deadlock
          setTimeout(async () => {
            try {
              const name = newSession.user?.user_metadata?.full_name || 
                           `${newSession.user?.user_metadata?.first_name || ''} ${newSession.user?.user_metadata?.last_name || ''}`.trim();
                         
              await ensureProfileExists(newSession.user.id, name);
            } catch (error) {
              console.error("Error ensuring profile exists:", error);
            }
          }, 0);
          
          toast({
            title: "Giriş başarılı",
            description: "Başarıyla giriş yaptınız.",
          });
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          toast({
            title: "Çıkış yapıldı",
            description: "Başarıyla çıkış yaptınız.",
          });
        }
      }
    );
    
    // Then check for existing session
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        console.log("Checking for existing session");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setIsLoading(false);
          return;
        }
        
        if (data.session) {
          console.log("Found existing session for user:", data.session.user.id);
          setSession(data.session);
          setUser(data.session.user);
          
          // Create or check profile with retry logic
          let attempts = 0;
          const maxAttempts = 3;
          let success = false;
          
          while (attempts < maxAttempts && !success) {
            attempts++;
            success = await ensureProfileExists(data.session.user.id);
            if (!success && attempts < maxAttempts) {
              console.log(`Profile creation attempt ${attempts} failed, retrying...`);
              // Small delay before retry
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          }
          
          if (!success) {
            console.error(`Failed to create profile after ${maxAttempts} attempts`);
          }
        } else {
          console.log("No existing session found");
        }
      } catch (error) {
        console.error('Unexpected error during session check:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
    
    return () => {
      console.log("Cleaning up auth state listener");
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      console.log("Attempting to sign in with Google...");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        console.error("Google auth error:", error);
        toast({
          title: "Giriş yapılamadı",
          description: "Google ile giriş yapılırken bir hata oluştu.",
          variant: "destructive",
        });
        throw error;
      }
      
      // Check if we got a redirect URL from the OAuth process
      if (data && data.url) {
        console.log("Redirecting to Google auth URL:", data.url);
        window.location.href = data.url;
      } else {
        console.error("No URL returned from signInWithOAuth");
        toast({
          title: "Giriş yapılamadı",
          description: "Google ile giriş yapılırken bir hata oluştu.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Google authentication error:', error);
      toast({
        title: "Giriş yapılamadı",
        description: "Google ile giriş yapılırken bir hata oluştu.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // New function: Sign in with email and password
  const signInWithEmailAndPassword = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting to sign in with email/password...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Email/password auth error:", error);
        toast({
          title: "Giriş yapılamadı",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      if (data?.user) {
        console.log("User signed in with email:", data.user.id);
        
        // Ensure profile exists
        setTimeout(async () => {
          try {
            const name = data.user?.user_metadata?.full_name || 
                         `${data.user?.user_metadata?.first_name || ''} ${data.user?.user_metadata?.last_name || ''}`.trim();
                         
            await ensureProfileExists(data.user.id, name);
          } catch (error) {
            console.error("Error ensuring profile exists:", error);
          }
        }, 0);
        
        toast({
          title: "Giriş başarılı",
          description: "Başarıyla giriş yaptınız.",
        });

        navigate('/');
      } else {
        console.log("No user data returned from auth");
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Email authentication error:', error);
      setIsLoading(false);
    }
  };

  // New function: Sign up with email and password
  const signUpWithEmailAndPassword = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting to sign up with email/password...");
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`
          }
        }
      });
      
      if (error) {
        console.error("Email/password signup error:", error);
        toast({
          title: "Kayıt yapılamadı",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      if (data?.user) {
        console.log("User signed up with email:", data.user.id);
        
        // Ensure profile exists
        setTimeout(async () => {
          try {
            await ensureProfileExists(data.user.id, `${firstName} ${lastName}`);
          } catch (error) {
            console.error("Error ensuring profile exists:", error);
          }
        }, 0);
        
        toast({
          title: "Kayıt başarılı",
          description: "Hesabınız başarıyla oluşturuldu.",
        });

        navigate('/');
      } else {
        console.log("No user data returned from signup");
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Email signup error:', error);
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out user");
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Çıkış yapılamadı",
        description: "Çıkış yapılırken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      signInWithGoogle,
      signInWithEmailAndPassword,
      signUpWithEmailAndPassword,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
