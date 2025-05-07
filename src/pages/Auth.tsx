const { watch } = signupForm;
// ...
useEffect(() => {
  console.log('📧 signupForm email değeri:', watch('email'));
}, [watch('email')]);
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { TrendingUp, Loader2, ArrowLeft, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Database } from '@/integrations/supabase/types';

type ProfileType = Database['public']['Tables']['profiles']['Row'];
type ProfileInsertType = Database['public']['Tables']['profiles']['Insert'];

// Removed email validation from schemas
const loginSchema = z.object({
  email: z.string().min(1, 'Email alanı zorunludur1'),
  password: z.string().min(1, 'Şifre alanı zorunludur'),
});

const signupSchema = z.object({
  email: z.string().min(1, 'Email alanı zorunludur2'),
  password: z.string().min(8, 'En az 8 karakter olmalıdır'),
  firstName: z.string().min(1, 'Ad alanı zorunludur'),
  lastName: z.string().min(1, 'Soyad alanı zorunludur'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP kodu 6 haneli olmalıdır'),
});

const Auth: React.FC = () => {
  const {
    user,
    signInWithGoogle,
    isLoading,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'main' | 'email-login' | 'email-signup' | 'otp-verify'>('main');
  const [otpEmail, setOtpEmail] = useState<string>('');
  const [otpUserData, setOtpUserData] = useState<any>(null);
  const [signupInProgress, setSignupInProgress] = useState(false);

  // Redirect path
  const from = (location.state as any)?.from || '/';

  // Form with more robust validation
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', firstName: '', lastName: '' },
    mode: 'onChange', // Add this to validate on change
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  // Profile creation helper
  const createProfile = async (userId: string, userName?: string) => {
    try {
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!checkError && existingProfile) return true;
      if (checkError && !checkError.message.includes('No rows found')) console.error(checkError);

      const { error: insertError } = await supabase
        .from('profiles')
        .insert([{ id: userId, full_name: userName || null } as ProfileInsertType]);

      if (insertError) {
        console.error(insertError);
        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert([{ id: userId, full_name: userName || null } as ProfileInsertType]);
        if (upsertError) {
          console.error(upsertError);
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // OAuth callback
  useEffect(() => {
    if (location.pathname === '/auth/callback') {
      const handleCallback = async () => {
        try {
          const params = new URLSearchParams(window.location.search);
          const hashParams = new URLSearchParams(window.location.hash.substring(1));

          if (params.get('error')) {
            toast({ title: 'Giriş başarısız', description: params.get('error_description') || '', variant: 'destructive' });
            navigate('/giris');
            return;
          }

          const token = hashParams.get('access_token') || params.get('access_token');
          if (token) {
            const { data, error } = await supabase.auth.getSession();
            if (error || !data.session) {
              toast({ title: 'Giriş hatası', description: 'Oturum bilgileri alınamadı.', variant: 'destructive' });
              navigate('/giris');
              return;
            }
            await createProfile(data.session.user.id, data.session.user.user_metadata?.name);
            navigate('/');
          } else {
            setTimeout(async () => {
              const { data } = await supabase.auth.getSession();
              if (data.session) {
                await createProfile(data.session.user.id, data.session.user.user_metadata?.name);
                navigate('/');
              } else navigate('/giris');
            }, 2000);
          }
        } catch (err) {
          console.error(err);
          toast({ title: 'Giriş işlemi tamamlanamadı', description: 'Bir hata oluştu.', variant: 'destructive' });
          navigate('/giris');
        }
      };
      handleCallback();
    }
  }, [location.pathname, navigate]);

  if (user && !isLoading) return <Navigate to={from} />;

  // Handlers with improved error handling
  const handleEmailLogin = async (data: { email: string; password: string }) => {
    try {
      console.log("Login form submitted with data:", data);
      await signInWithEmailAndPassword(data.email, data.password);
    } catch (error: any) {
      toast({ title: 'Giriş yapılamadı', description: error.message, variant: 'destructive' });
    }
  };

  const handleEmailSignup = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    try {
      console.log("Signup form submitted with data:", data);
      
      setSignupInProgress(true);
      setOtpUserData(data);
      setOtpEmail(data.email);

      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: { shouldCreateUser: true },
      });
      if (error) throw error;
      toast({ title: 'Doğrulama kodu gönderildi', description: 'Emailinizi kontrol edin.' });
      setAuthMode('otp-verify');
    } catch (error: any) {
      toast({ title: 'Kayıt oluşturulamadı', description: error.message, variant: 'destructive' });
    } finally {
      setSignupInProgress(false);
    }
  };

  const handleVerifyOtp = async (data: { otp: string }) => {
    try {
      if (!otpUserData) throw new Error('Eksik kullanıcı verisi');
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: otpUserData.email,
        token: data.otp,
        type: 'email',
      });
      if (verifyError) throw verifyError;
      await signUpWithEmailAndPassword(
        otpUserData.email,
        otpUserData.password,
        otpUserData.firstName,
        otpUserData.lastName
      );
      navigate('/');
    } catch (error: any) {
      toast({ title: 'Doğrulama başarısız', description: error.message, variant: 'destructive' });
    }
  };

  // Render forms
  const renderAuthForm = () => {
    switch (authMode) {
      case 'email-login':
        return (
          <>
            <CardHeader className="space-y-1">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => setAuthMode('main')}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-2xl font-bold">Email ile Giriş</CardTitle>
              </div>
              <CardDescription>Email adresiniz ve şifrenizle giriş yapın</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleEmailLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="ornek@email.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Şifre</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Yükleniyor...
                      </span>
                    ) : (
                      'Giriş Yap'
                    )}
                  </Button>
                </form>
              </Form>
              <div className="mt-4 text-center">
                <button onClick={() => setAuthMode('email-signup')} className="text-sm text-primary hover:underline">
                  Hesabınız yok mu? Kaydolun
                </button>
              </div>
            </CardContent>
          </>
        );

      case 'email-signup':
        return (
          <>
            <CardHeader className="space-y-1">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => setAuthMode('main')}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-2xl font-bold">Yeni Hesap Oluştur</CardTitle>
              </div>
              <CardDescription>Bilgilerinizi girerek yeni hesap oluşturun</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(handleEmailSignup)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={signupForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Soyad</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="ornek@email.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Şifre</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="En az 8 karakter" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-primary" 
                    disabled={signupInProgress}
                  >
                    {signupInProgress ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Yükleniyor...
                      </span>
                    ) : (
                      'Hesap Oluştur'
                    )}
                  </Button>
                </form>
              </Form>
              <div className="mt-4 text-center">
                <button onClick={() => setAuthMode('email-login')} className="text-sm text-primary hover:underline">
                  Zaten hesabınız var mı? Giriş yapın
                </button>
              </div>
            </CardContent>
          </>
        );

      case 'otp-verify':
        return (
          <>
            <CardHeader className="space-y-1">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => setAuthMode('email-signup')}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-2xl font-bold">Email Doğrulama</CardTitle>
              </div>
              <CardDescription>
                <span className="font-medium">{otpEmail}</span> adresine gönderilen 6 haneli kodu girin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...otpForm}>
                <form onSubmit={otpForm.handleSubmit(handleVerifyOtp)} className="space-y-4">
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center space-y-4">
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              {Array.from({ length: 6 }).map((_, i) => (
                                <InputOTPSlot key={i} />
                              ))}
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary mt-4" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Yükleniyor...
                      </span>
                    ) : (
                      'Doğrula ve Hesap Oluştur'
                    )}
                  </Button>
                </form>
              </Form>
              <div className="mt-4 text-center">
                <button
                  onClick={async () => {
                    if (otpUserData?.email) {
                      try {
                        await supabase.auth.signInWithOtp({
                          email: otpUserData.email,
                          options: { shouldCreateUser: true },
                        });
                        toast({ title: 'Yeni kod gönderildi', description: 'Emailinizi kontrol edin.' });
                      } catch {
                        toast({ title: 'Kod gönderilemedi', description: 'Tekrar deneyin.', variant: 'destructive' });
                      }
                    }
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Kodu tekrar gönder
                </button>
              </div>
            </CardContent>
          </>
        );

      default:
        return (
          <>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Giriş Yap / Kaydol</CardTitle>
              <CardDescription>Kredibilite oluşturma yolculuğunuza başlayın</CardDescription>
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

                <div className="relative flex items-center justify-center py-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300"></span>
                  </div>
                  <div className="relative bg-white px-4 text-sm text-gray-500">veya</div>
                </div>

                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
                  onClick={() => setAuthMode('email-login')}
                  disabled={isLoading}
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Email ile Devam Et</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-gray-500">
                Devam ederek,{' '}
                <a href="/kullanim-kosullari" className="underline text-primary">
                  Hizmet Şartlarımızı
                </a>{' '}
                ve{' '}
                <a href="/gizlilik-politikasi" className="underline text-primary">
                  Gizlilik Politikamızı
                </a>{' '}
                kabul etmiş olursunuz.
              </div>
            </CardFooter>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <span className="font-heading text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center justify-center">
          SkorUp
          <TrendingUp className="ml-2 h-6 w-6 text-primary" />
        </span>
        <p className="text-gray-600 mt-2">Finansal geleceğinizi inşa edin</p>
      </div>
      <Card className="w-full max-w-md shadow-lg">{renderAuthForm()}</Card>
    </div>
  );
};

export default Auth;
