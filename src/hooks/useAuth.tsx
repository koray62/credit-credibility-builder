
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from './use-toast';
import { AuthContextType } from '@/types/auth';
import { ensureProfileExists } from '@/utils/profileUtils';
import { 
  signInWithGoogle as signInWithGoogleService,
  signInWithEmailAndPassword as signInWithEmailPasswordService,
  signUpWithEmailAndPassword as signUpWithEmailPasswordService,
  signOut as signOutService
} from '@/services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // First set up auth state listener to catch any auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event, newSession?.user?.id);
        
        // Perform synchronous state updates first to avoid deadlocks
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && newSession?.user) {
          console.log("User signed in:", newSession.user.id);
          
          // Create profile using a Promise to avoid race conditions and deadlocks
          // Use requestAnimationFrame instead of setTimeout to reduce flicker
          requestAnimationFrame(() => {
            const fullName = newSession.user?.user_metadata?.full_name || 
                        `${newSession.user?.user_metadata?.first_name || ''} ${newSession.user?.user_metadata?.last_name || ''}`.trim();
                        
            // Use a Promise to handle profile creation without blocking
            ensureProfileExists(newSession.user.id, fullName)
              .catch(error => {
                console.error("Error ensuring profile exists:", error);
              });
          });
          
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
        } else if (event === 'USER_UPDATED') {
          console.log("User updated:", newSession?.user);
          if (newSession?.user) {
            ensureProfileExists(newSession.user.id);
          }
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
          
          // Create or check profile with retry logic, using a delay to avoid race conditions
          requestAnimationFrame(() => {
            let attempts = 0;
            const maxAttempts = 3;
            
            const tryCreateProfile = async () => {
              if (attempts >= maxAttempts) {
                console.error(`Failed to create profile after ${maxAttempts} attempts`);
                return;
              }
              
              attempts++;
              const success = await ensureProfileExists(data.session.user.id);
              
              if (!success && attempts < maxAttempts) {
                console.log(`Profile creation attempt ${attempts} failed, retrying...`);
                // Increase delay between retries
                setTimeout(tryCreateProfile, 500 * attempts);
              }
            };
            
            tryCreateProfile();
          });
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

  // Authentication service wrappers with loading state handling
  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogleService();
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailPasswordService(email, password);
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmailAndPassword = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      await signUpWithEmailPasswordService(email, password, firstName, lastName);
    } catch (error) {
      console.error('Error in signUpWithEmailAndPassword:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await signOutService();
      navigate('/');
    } catch (error) {
      console.error('Error in signOut:', error);
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
