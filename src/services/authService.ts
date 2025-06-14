
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/hooks/use-toast';
import { ensureProfileExists } from "@/utils/profileUtils";

/**
 * Signs in the user with Google OAuth
 */
export const signInWithGoogle = async (): Promise<void> => {
  try {
    console.log("Attempting to sign in with Google...");
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
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
      console.log("Redirecting to Google auth URL");
      window.location.href = data.url;
    } else {
      console.error("No URL returned from signInWithOAuth");
      toast({
        title: "Giriş yapılamadı",
        description: "Google ile giriş yapılırken bir hata oluştu.",
        variant: "destructive",
      });
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

/**
 * Signs in the user with email and password
 */
export const signInWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
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
      
      // Ensure profile exists in background
      requestAnimationFrame(() => {
        const name = data.user?.user_metadata?.full_name || 
                    `${data.user?.user_metadata?.first_name || ''} ${data.user?.user_metadata?.last_name || ''}`.trim();
                    
        ensureProfileExists(data.user.id, name).catch(error => {
          console.error("Error ensuring profile exists:", error);
        });
      });
      
      toast({
        title: "Giriş başarılı",
        description: "Başarıyla giriş yaptınız.",
      });
    } else {
      console.log("No user data returned from auth");
    }
  } catch (error) {
    console.error('Email authentication error:', error);
  }
};

/**
 * Signs up a new user with email and password
 */
export const signUpWithEmailAndPassword = async (email: string, password: string, firstName: string, lastName: string): Promise<void> => {
  try {
    console.log("Attempting to sign up with email/password...");
    console.log("Registration data:", { email, firstName, lastName });
    
    const fullName = `${firstName} ${lastName}`.trim();
    
    // Make sure we explicitly set the email confirmation options
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: fullName
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
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
      console.log("User metadata:", data.user.user_metadata);
      
      // Ensure profile exists in background with the full name
      requestAnimationFrame(() => {
        ensureProfileExists(data.user.id, fullName).catch(error => {
          console.error("Error ensuring profile exists:", error);
        });
      });
      
      toast({
        title: "Kayıt başarılı",
        description: "Doğrulama emaili gönderildi. Lütfen email adresinizi kontrol edin.",
      });
    } else {
      console.log("No user data returned from signup");
    }
  } catch (error) {
    console.error('Email signup error:', error);
    throw error;
  }
};

/**
 * Signs out the current user
 */
export const signOut = async (): Promise<void> => {
  try {
    console.log("Signing out user");
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    toast({
      title: "Çıkış yapılamadı",
      description: "Çıkış yapılırken bir hata oluştu.",
      variant: "destructive",
    });
  }
};
