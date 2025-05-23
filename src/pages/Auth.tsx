
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

// Schemas with minimal validation
const loginSchema = z.object({
  email: z.string().min(1, 'Email alanı zorunludur'),
  password: z.string().min(1, 'Şifre alanı zorunludur'),
});

const signupSchema = z.object({
  email: z.string().min(1, 'Email alanı zorunludur'),
  password: z.string().min(8, 'En az 8 karakter olmalıdır'),
  firstName: z.string().min(1, 'Ad alanı zorunludur'),
  lastName: z.string().min(1, 'Soyad alanı zorunludur'),
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
  const [authMode, setAuthMode] = useState<'main' | 'email-login' | 'email-signup' | 'email-verification'>('main');
  const [signupInProgress, setSignupInProgress] = useState(false);
  const [signupData, setSignupData] = useState<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  } | null>(null);

  // Form setup
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', firstName: '', lastName: '' },
    mode: 'onChange',
  });

  // Add watchers to track form values
  const emailValue = signupForm.watch('email');
  const passwordValue = signupForm.watch('password');
  const firstNameValue = signupForm.watch('firstName');
  const lastNameValue = signupForm.watch('lastName');

  // Debug the form values on each render
  useEffect(() => {
    console.log('Email değeri:', emailValue);
    console.log('Password değeri:', passwordValue);
    console.log('First name değeri:', firstNameValue);
    console.log('Last name değeri:', lastNameValue);
    console.log('Form values:', signupForm.getValues());
    console.log('Form errors:', signupForm.formState.errors);
  }, [emailValue, passwordValue, firstNameValue, lastNameValue]);

  // Redirect path
  const from = (location.state as any)?.from || '/';

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

  // Handlers with improved debugging
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
      console.log("Email submitted:", data.email);
      
      setSignupInProgress(true);
      setSignupData(data);

      // Use direct signUp instead of OTP
      await signUpWithEmailAndPassword(
        data.email,
        data.password,
        data.firstName,
        data.lastName
      );
      
      setAuthMode('email-verification');
      toast({ 
        title: 'Doğrulama emaili gönderildi', 
        description: 'Emailinizdeki linke tıklayarak üyeliğinizi tamamlayın.' 
      });
      
    } catch (error: any) {
      toast({ title: 'Kayıt oluşturulamadı', description: error.message, variant: 'destructive' });
    } finally {
      setSignupInProgress(false);
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
                            type="email"
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
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Form submitted");
                    console.log("Current values:", signupForm.getValues());
                    signupForm.handleSubmit(handleEmailSignup)(e);
                  }} 
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={signupForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              onChange={(e) => {
                                console.log("firstName change:", e.target.value);
                                field.onChange(e);
                              }}
                            />
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
                            <Input 
                              {...field} 
                              onChange={(e) => {
                                console.log("lastName change:", e.target.value);
                                field.onChange(e);
                              }}
                            />
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
                            type="email"
                            placeholder="ornek@email.com" 
                            {...field} 
                            value={field.value}
                            onChange={(e) => {
                              console.log("Email field change:", e.target.value);
                              field.onChange(e);
                              // Force a form value update
                              signupForm.setValue('email', e.target.value, { shouldValidate: true });
                            }}
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
                          <Input 
                            type="password" 
                            placeholder="En az 8 karakter" 
                            {...field} 
                            onChange={(e) => {
                              console.log("Password change:", e.target.value);
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-primary" 
                    disabled={signupInProgress}
                    onClick={() => {
                      console.log("Submit button clicked");
                      console.log("Form values:", signupForm.getValues());
                      console.log("Form errors:", signupForm.formState.errors);
                      console.log("Form state:", signupForm.formState);
                    }}
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

      case 'email-verification':
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
                <span className="font-medium">{signupData?.email}</span> adresine doğrulama bağlantısı gönderdik
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p>Lütfen email adresinizi kontrol edin ve gelen bağlantıya tıklayarak hesabınızı doğrulayın.</p>
              <Button
                onClick={() => {
                  if (signupData?.email) {
                    supabase.auth.resend({
                      email: signupData.email,
                      type: 'signup'
                    }).then(() => {
                      toast({ title: 'Email tekrar gönderildi', description: 'Lütfen gelen kutunuzu kontrol edin.' });
                    }).catch(() => {
                      toast({ title: 'Email gönderilemedi', description: 'Lütfen daha sonra tekrar deneyin.', variant: 'destructive' });
                    });
                  }
                }}
                variant="outline"
              >
                Doğrulama emailini tekrar gönder
              </Button>
              <div className="mt-4">
                <button onClick={() => setAuthMode('email-login')} className="text-sm text-primary hover:underline">
                  Giriş sayfasına dön
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
