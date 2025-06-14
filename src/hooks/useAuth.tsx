
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
    
    let profileCreationInProgress = false;
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event, newSession?.user?.id);
        
        // Update state immediately to prevent race conditions
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && newSession?.user && !profileCreationInProgress) {
          console.log("User signed in:", newSession.user.id);
          profileCreationInProgress = true;
          
          // Handle profile creation with better error handling
          const handleProfileCreation = async () => {
            try {
              const fullName = newSession.user?.user_metadata?.full_name || 
                          `${newSession.user?.user_metadata?.first_name || ''} ${newSession.user?.user_metadata?.last_name || ''}`.trim();
              
              await ensureProfileExists(newSession.user.id, fullName);
              
              toast({
                title: "Giriş başarılı",
                description: "Başarıyla giriş yaptınız.",
              });
            } catch (error) {
              console.error("Error ensuring profile exists:", error);
              // Don't show error toast for profile creation issues during auth
            } finally {
              profileCreationInProgress = false;
            }
          };
          
          // Use requestAnimationFrame to avoid blocking the auth flow
          requestAnimationFrame(handleProfileCreation);
          
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          profileCreationInProgress = false;
          toast({
            title: "Çıkış yapıldı",
            description: "Başarıyla çıkış yaptınız.",
          });
        } else if (event === 'USER_UPDATED' && newSession?.user && !profileCreationInProgress) {
          console.log("User updated:", newSession?.user);
          profileCreationInProgress = true;
          
          requestAnimationFrame(async () => {
            try {
              await ensureProfileExists(newSession.user.id);
            } catch (error) {
              console.error("Error ensuring profile exists on update:", error);
            } finally {
              profileCreationInProgress = false;
            }
          });
        }
      }
    );
    
    // Check for existing session
    const initializeAuth = async () => {
      try {
        console.log("Checking for existing session");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          return;
        }
        
        if (data.session) {
          console.log("Found existing session for user:", data.session.user.id);
          setSession(data.session);
          setUser(data.session.user);
          
          // Ensure profile exists for existing session
          if (!profileCreationInProgress) {
            profileCreationInProgress = true;
            
            requestAnimationFrame(async () => {
              try {
                await ensureProfileExists(data.session.user.id);
              } catch (error) {
                console.error("Error ensuring profile exists for existing session:", error);
              } finally {
                profileCreationInProgress = false;
              }
            });
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

  // Authentication service wrappers with improved loading state handling
  const signInWithGoogle = async () => {
    try {
      await signInWithGoogleService();
    } catch (error) {
      console.error('Error in signInWithGoogle:', error);
      setIsLoading(false);
    }
  };

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailPasswordService(email, password);
      navigate('/');
    } catch (error) {
      console.error('Error in signInWithEmailAndPassword:', error);
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
