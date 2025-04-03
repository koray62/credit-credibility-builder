
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from './use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // First set up auth state listener to catch any auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event);
        
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          // Defer profile creation check to avoid potential auth deadlocks
          setTimeout(async () => {
            if (newSession?.user) {
              try {
                await ensureUserProfile(newSession.user);
              } catch (error) {
                console.error("Error ensuring user profile after sign in:", error);
              }
            }
          }, 0);
          
          toast({
            title: "Giriş başarılı",
            description: "Başarıyla giriş yaptınız.",
          });
        } else if (event === 'SIGNED_OUT') {
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
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          return;
        }
        
        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
          
          // Check if the user has a profile - defer to avoid auth deadlocks
          setTimeout(async () => {
            try {
              await ensureUserProfile(data.session.user);
            } catch (error) {
              console.error("Error ensuring user profile on initialization:", error);
            }
          }, 0);
        }
      } catch (error) {
        console.error('Unexpected error during session check:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to ensure a user has a profile
  const ensureUserProfile = async (user: User) => {
    if (!user) return;
    
    try {
      console.log("Checking for user profile:", user.id);
      
      // First check if profile exists
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      
      if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        throw fetchError;
      }
      
      // If profile doesn't exist, create it
      if (!profile) {
        console.log('Creating new profile for user:', user.id);
        const fullName = user.user_metadata?.name || 
                        user.user_metadata?.full_name || 
                        "Kullanıcı";
                        
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            full_name: fullName,
            kvkk_consent: false,
            marketing_consent: false
          });
          
        if (insertError) {
          console.error('Error creating profile:', insertError);
          toast({
            title: "Profil oluşturulamadı",
            description: "Profiliniz oluşturulurken bir hata oluştu.",
            variant: "destructive",
          });
          throw insertError;
        } else {
          console.log('Profile created successfully');
        }
      } else {
        console.log('User profile exists:', profile);
      }
    } catch (error) {
      console.error('Error ensuring user profile:', error);
      throw error;
    }
  };

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

  const signOut = async () => {
    try {
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
