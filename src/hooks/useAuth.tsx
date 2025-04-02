
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from './use-toast';

type ProfileType = {
  id: string;
  full_name: string | null;
  tc_kimlik: string | null;
  phone: string | null;
  address: string | null;
  district: string | null;
  city: string | null;
  education_level: string | null;
  occupation: string | null;
  monthly_income: number | null;
  birth_date: string | null;
  kvkk_consent: boolean | null;
  marketing_consent: boolean | null;
  consent_updated_at: string | null;
}

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: ProfileType | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<ProfileType>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile data
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      if (data) {
        // Ensure all fields from ProfileType are present, even if null
        const profileData: ProfileType = {
          id: data.id,
          full_name: data.full_name,
          tc_kimlik: data.tc_kimlik,
          phone: data.phone,
          address: data.address,
          district: data.district,
          city: data.city,
          education_level: data.education_level,
          occupation: data.occupation,
          monthly_income: data.monthly_income,
          birth_date: data.birth_date,
          kvkk_consent: data.kvkk_consent,
          marketing_consent: data.marketing_consent,
          consent_updated_at: data.consent_updated_at
        };
        
        setProfile(profileData);
      } else {
        console.log('No profile found for user:', userId);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  // Update user profile data
  const updateProfile = async (profileData: Partial<ProfileType>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);
        
      if (error) {
        toast({
          title: "Profil güncellenemedi",
          description: "Profil bilgileriniz güncellenirken bir hata oluştu.",
          variant: "destructive",
        });
        throw error;
      }
      
      // Refresh profile data
      await fetchProfile(user.id);
      
      toast({
        title: "Profil güncellendi",
        description: "Profil bilgileriniz başarıyla güncellendi.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    let mounted = true;
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Fetch profile when user logs in
        if (newSession?.user) {
          await fetchProfile(newSession.user.id);
        } else {
          setProfile(null);
        }
        
        if (event === 'SIGNED_IN') {
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

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          // Fetch profile for existing session
          if (currentSession?.user) {
            await fetchProfile(currentSession.user.id);
          }
          
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/v1/callback`,
        },
      });
      
      if (error) {
        console.error('Google authentication error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Google authentication error:', error);
      toast({
        title: "Giriş yapılamadı",
        description: "Google ile giriş yapılırken bir hata oluştu.",
        variant: "destructive",
      });
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
      profile,
      isLoading,
      signInWithGoogle,
      signOut,
      updateProfile,
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
