
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { TrendingUp, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Auth: React.FC = () => {
  const { user, signInWithGoogle, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the return path from location state or default to home
  const from = (location.state as any)?.from || "/";

  // Handle callback from OAuth provider
  useEffect(() => {
    if (location.pathname === '/auth/callback') {
      const handleAuthCallback = async () => {
        try {
          console.log("Processing auth callback...");
          // Check URL parameters for success or error indicators
          const params = new URLSearchParams(window.location.search);
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          
          if (params.get('error')) {
            console.error("Auth error from URL params:", params.get('error'));
            toast({
              title: "Giriş başarısız",
              description: params.get('error_description') || "Giriş sırasında bir hata oluştu.",
              variant: "destructive",
            });
            navigate('/giris');
            return;
          }
          
          // Check for authentication tokens
          if (hashParams.get('access_token') || params.get('access_token')) {
            console.log("Access token found in URL");
            
            // Exchange the token for a session
            const { data, error } = await supabase.auth.getSession();
            if (error) {
              console.error("Error getting session after callback:", error);
              toast({
                title: "Giriş hatası",
                description: "Oturum bilgileri alınamadı.",
                variant: "destructive",
              });
              navigate('/giris');
              return;
            }
            
            if (data.session) {
              console.log("Session established, user ID:", data.session.user.id);
              
              // Verify that the profile exists by checking the profiles table
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.session.user.id)
                .single();
                
              if (profileError) {
                console.log("No profile found, might be created by trigger:", profileError);
                // We'll rely on the database trigger to create the profile
              } else {
                console.log("Profile found:", profileData);
              }
              
              // Navigate to home page after successful login
              navigate('/');
            } else {
              console.error("No session after token exchange");
              toast({
                title: "Giriş hatası",
                description: "Oturum başlatılamadı.",
                variant: "destructive",
              });
              navigate('/giris');
            }
          } else {
            console.log("In callback URL, waiting for session...");
            // The session should be picked up by the auth state listener
            // After a short delay, check if we have a session and redirect accordingly
            setTimeout(async () => {
              const { data } = await supabase.auth.getSession();
              if (data.session) {
                console.log("Session established after delay");
                navigate('/');
              } else {
                console.log("No session established after callback");
                navigate('/giris');
              }
            }, 2000);
          }
        } catch (err) {
          console.error("Error handling auth callback:", err);
          toast({
            title: "Giriş işlemi tamamlanamadı",
            description: "Giriş işlemi sırasında bir hata oluştu.",
            variant: "destructive",
          });
          navigate('/giris');
        }
      };
      
      handleAuthCallback();
    }
  }, [location.pathname, navigate]);

  // Redirect if user is already authenticated
  if (user && !isLoading) {
    return <Navigate to={from} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <span className="font-heading text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center justify-center">
          SkorUp
          <TrendingUp className="ml-2 h-6 w-6 text-primary" />
        </span>
        <p className="text-gray-600 mt-2">Finansal geleceğinizi inşa edin</p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Giriş Yap / Kaydol</CardTitle>
          <CardDescription>
            Kredibilite oluşturma yolculuğunuza başlayın
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
              onClick={signInWithGoogle}
              disabled={isLoading}
            >
              <FcGoogle className="h-5 w-5" />
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Yükleniyor...
                </span>
              ) : (
                <span>Google ile Devam Et</span>
              )}
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-500">
            Devam ederek, <a href="#" className="underline text-primary">Hizmet Şartlarımızı</a> ve{' '}
            <a href="#" className="underline text-primary">Gizlilik Politikamızı</a> kabul etmiş olursunuz.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
