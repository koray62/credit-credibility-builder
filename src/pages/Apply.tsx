import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckIcon, ChevronRightIcon, AlertTriangle, HelpCircle, Calendar as CalendarIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Apply: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    tcKimlik: '',
    ad: '',
    soyad: '',
    dogumTarihi: '',
    telefon: '',
    email: '',
    adres: '',
    ilce: '',
    sehir: '',
    egitimDurumu: '',
    meslek: '',
    digerMeslek: '',
    gelir: '',
    taksitTutari: '2000', // Default minimum value
    krediVadesi: '12', // Default minimum value
    kvkkOnay: false,
    pazarlamaIzni: false,
    taahhut1: false,
    taahhut2: false,
    taahhut3: false
  });
  const [date, setDate] = useState<Date | undefined>();
  const [formErrors, setFormErrors] = useState({
    taksitTutari: false,
    krediVadesi: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingApplication, setExistingApplication] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing applications
  useEffect(() => {
    const checkExistingApplications = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('credit_applications')
          .select('status')
          .eq('user_id', user.id);
          
        if (error) {
          console.error('Error checking existing applications:', error);
          setIsLoading(false);
          return;
        }
        
        // Check if user has any applications
        if (data && data.length > 0) {
          // Check if any application is accepted
          const hasAcceptedApp = data.some(app => app.status === 'accepted');
          if (hasAcceptedApp) {
            setExistingApplication(true);
            toast({
              title: "Aktif başvurunuz bulunmaktadır",
              description: "Halihazırda onaylanmış bir başvurunuz bulunmaktadır. Yeni başvuru yapamazsınız.",
              variant: "destructive"
            });
          }
        }
      } catch (error) {
        console.error('Error checking applications:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const timer = setTimeout(() => {
      checkExistingApplications();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [user]);

  // Scroll to top when page loads or step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    // When date changes, update dogumTarihi in formData
    if (date) {
      const formattedDate = format(date, 'dd/MM/yyyy');
      setFormData(prev => ({ ...prev, dogumTarihi: formattedDate }));
    }
  }, [date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'dogumTarihi') {
      // Auto-format the date as user types
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 0) {
        // Add slashes between day, month, year
        if (formattedValue.length > 2 && formattedValue.length <= 4) {
          formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
        } else if (formattedValue.length > 4) {
          formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4) + '/' + formattedValue.substring(4, 8);
        }
      }
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Reset the form errors when user types
      if (name === 'taksitTutari') {
        setFormErrors(prev => ({ ...prev, taksitTutari: false }));
      } else if (name === 'krediVadesi') {
        setFormErrors(prev => ({ ...prev, krediVadesi: false }));
      }
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'meslek' && value !== 'diger') {
      setFormData(prev => ({ ...prev, digerMeslek: '' }));
    }
  };

  const validateStepFields = (step: number) => {
    let isValid = true;
    let newErrors = { ...formErrors };
    
    if (step === 2) {
      // Validate taksit tutarı
      if (formData.taksitTutari && Number(formData.taksitTutari) < 2000) {
        newErrors.taksitTutari = true;
        isValid = false;
      }
      
      // Validate kredi vadesi
      if (formData.krediVadesi) {
        const vade = Number(formData.krediVadesi);
        if (vade < 12 || vade > 24) {
          newErrors.krediVadesi = true;
          isValid = false;
        }
      }
      
      setFormErrors(newErrors);
    }
    
    return isValid;
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.tcKimlik && formData.tcKimlik.length === 11 &&
               formData.ad && formData.soyad && formData.dogumTarihi &&
               formData.telefon && formData.email;
      case 2:
        return formData.adres && formData.ilce && formData.sehir && 
               formData.egitimDurumu && (formData.meslek !== 'diger' || 
               (formData.meslek === 'diger' && formData.digerMeslek)) && 
               formData.gelir && formData.taksitTutari && 
               formData.krediVadesi;
      case 3:
        return formData.kvkkOnay && (formData.taahhut1 && formData.taahhut2 && formData.taahhut3);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStepFields(currentStep) && isStepValid(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      if (formErrors.taksitTutari) {
        alert("Minimum taksit tutarı 2000 TL olmalıdır.");
      } else if (formErrors.krediVadesi) {
        alert("Vade süresi 12-24 ay arasında olmalıdır.");
      } else {
        alert("Lütfen tüm zorunlu alanları doldurun.");
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isStepValid(currentStep)) {
      toast({
        title: "Eksik bilgi",
        description: "Lütfen tüm zorunlu alanları doldurun ve taahhütleri onaylayın.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if user is authenticated
      if (!user) {
        toast({
          title: "Giriş yapılmadı",
          description: "Başvuru yapabilmek için giriş yapmanız gerekmektedir.",
          variant: "destructive"
        });
        navigate('/giris');
        return;
      }

      // Prepare application data for database
      const applicationData = {
        user_id: user.id,
        amount: parseFloat(formData.taksitTutari),
        installment_count: parseInt(formData.krediVadesi),
        status: 'pending',
        notes: `Ad: ${formData.ad} ${formData.soyad}, TC: ${formData.tcKimlik}, Tel: ${formData.telefon}, E-posta: ${formData.email}, Adres: ${formData.adres}, ${formData.ilce}, ${formData.sehir}, Doğum Tarihi: ${formData.dogumTarihi}, Eğitim: ${formData.egitimDurumu}, Meslek: ${formData.meslek === 'diger' ? formData.digerMeslek : formData.meslek}, Gelir: ${formData.gelir} TL`,
        // Store checkbox values
        kvkk_consent: formData.kvkkOnay,
        marketing_consent: formData.pazarlamaIzni,
        no_active_loans: formData.taahhut1,
        all_loans_paid: formData.taahhut2,
        no_legal_proceedings: formData.taahhut3
      };

      // Save application to database
      const { error } = await supabase
        .from('credit_applications')
        .insert([applicationData]);

      if (error) {
        // Check if the error is because user already has an accepted application
        if (error.message.includes('User already has an accepted application')) {
          toast({
            title: "Başvuru yapılamadı",
            description: "Halihazırda onaylanmış bir başvurunuz bulunmaktadır. Yeni başvuru yapamazsınız.",
            variant: "destructive"
          });
          navigate('/surec');
          return;
        }
        throw error;
      }

      // Redirect to success page
      toast({
        title: "Başvuru başarılı",
        description: "Başvurunuz başarıyla kaydedildi.",
      });
      navigate('/basvuru-basarili');
      
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Başvuru hatası",
        description: "Başvurunuz kaydedilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const meslekListesi = [
    { value: "ogrenci", label: "Öğrenci" },
    { value: "ogretmen", label: "Öğretmen" },
    { value: "doktor", label: "Doktor" },
    { value: "muhendis", label: "Mühendis" },
    { value: "avukat", label: "Avukat" },
    { value: "memur", label: "Devlet Memuru" },
    { value: "isci", label: "İşçi" },
    { value: "yonetici", label: "Yönetici" },
    { value: "satisci", label: "Satış Elemanı" },
    { value: "teknisyen", label: "Teknisyen" },
    { value: "muhasebeci", label: "Muhasebeci" },
    { value: "mimar", label: "Mimar" },
    { value: "hizmetli", label: "Hizmetli" },
    { value: "emekli", label: "Emekli" },
    { value: "evhanimi", label: "Ev Hanımı" },
    { value: "issiz", label: "İşsiz" },
    { value: "diger", label: "Diğer" }
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 md:py-16 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Existing application state
  if (existingApplication) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <Alert variant="destructive" className="mb-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Aktif başvurunuz bulunmaktadır</AlertTitle>
                  <AlertDescription>
                    Halihazırda onaylanmış bir başvurunuz bulunmaktadır. Aynı anda birden fazla başvuru yapamazsınız.
                  </AlertDescription>
                </Alert>
                
                <p className="text-gray-600 mb-6">
                  Mevcut başvurunuzun durumunu kontrol etmek için süreç takibi sayfasını ziyaret edebilirsiniz.
                </p>
                
                <div className="flex justify-center">
                  <Link to="/surec">
                    <Button className="bg-primary hover:bg-primary-dark text-white">
                      Süreç Takibine Git
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Kredibilite Oluşturma Programı Başvurusu
                </h1>
                <p className="text-gray-600">
                  Lütfen aşağıdaki formu doldurarak başvurunuzu tamamlayın. Tüm bilgiler güvenli bir şekilde işlenir.
                </p>
              </div>
              
              {/* İlerleme Çubuğu */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-2">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep === step
                          ? 'bg-primary text-white'
                          : currentStep > step
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > step ? <CheckIcon size={18} /> : step}
                    </div>
                  ))}
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <div 
                    className="absolute h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600">Kişisel Bilgiler</span>
                  <span className="text-sm text-gray-600">Ek Bilgiler</span>
                  <span className="text-sm text-gray-600">Onay</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* Adım 1: Kişisel Bilgiler */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tcKimlik">T.C. Kimlik Numarası *</Label>
                        <Input
                          id="tcKimlik"
                          name="tcKimlik"
                          placeholder="11 haneli TC Kimlik Numaranız"
                          value={formData.tcKimlik}
                          onChange={handleChange}
                          required
                          minLength={11}
                          maxLength={11}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dogumTarihi">Doğum Tarihi *</Label>
                        <div className="flex gap-2">
                          <Input
                            id="dogumTarihi"
                            name="dogumTarihi"
                            type="text"
                            value={formData.dogumTarihi}
                            onChange={handleChange}
                            required
                            placeholder="GG/AA/YYYY"
                            pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
                            className="flex-grow"
                          />
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button 
                                variant="outline" 
                                type="button"
                                className="px-2 h-10"
                              >
                                <CalendarIcon className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <p className="text-xs text-gray-500">Örnek: 01/05/1990</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ad">Adınız *</Label>
                        <Input
                          id="ad"
                          name="ad"
                          placeholder="Adınız"
                          value={formData.ad}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="soyad">Soyadınız *</Label>
                        <Input
                          id="soyad"
                          name="soyad"
                          placeholder="Soyadınız"
                          value={formData.soyad}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="telefon">Telefon Numarası *</Label>
                        <Input
                          id="telefon"
                          name="telefon"
                          placeholder="05XX XXX XX XX"
                          value={formData.telefon}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta Adresi *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="ornek@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-primary hover:bg-primary-dark text-white"
                        disabled={!isStepValid(1)}
                      >
                        Devam Et <ChevronRightIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Adım 2: Ek Bilgiler */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="adres">Adres *</Label>
                        <Input
                          id="adres"
                          name="adres"
                          placeholder="Adresiniz"
                          value={formData.adres}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ilce">İlçe *</Label>
                        <Input
                          id="ilce"
                          name="ilce"
                          placeholder="İlçe"
                          value={formData.ilce}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sehir">Şehir *</Label>
                        <Input
                          id="sehir"
                          name="sehir"
                          placeholder="Şehir"
                          value={formData.sehir}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label>Eğitim Durumu *</Label>
                        <RadioGroup value={formData.egitimDurumu} onValueChange={(value) => handleRadioChange('egitimDurumu', value)} className="grid grid-cols-2 gap-4 pt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ilkogretim" id="egitim-ilkogretim" />
                            <Label htmlFor="egitim-ilkogretim" className="font-normal cursor-pointer">İlköğretim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lise" id="egitim-lise" />
                            <Label htmlFor="egitim-lise" className="font-normal cursor-pointer">Lise</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="universite" id="egitim-universite" />
                            <Label htmlFor="egitim-universite" className="font-normal cursor-pointer">Üniversite</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lisansustu" id="egitim-lisansustu" />
                            <Label htmlFor="egitim-lisansustu" className="font-normal cursor-pointer">Lisansüstü</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="meslek">Meslek *</Label>
                        <Select 
                          value={formData.meslek} 
                          onValueChange={(value) => handleSelectChange('meslek', value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Mesleğinizi seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {meslekListesi.map((meslek) => (
                              <SelectItem key={meslek.value} value={meslek.value}>
                                {meslek.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {formData.meslek === 'diger' && (
                        <div className="space-y-2 col-span-1 md:col-span-2">
                          <Label htmlFor="digerMeslek">Mesleğinizi Belirtin *</Label>
                          <Input
                            id="digerMeslek"
                            name="digerMeslek"
                            placeholder="Mesleğinizi yazın"
                            value={formData.digerMeslek}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="gelir">Aylık Net Gelir (TL) *</Label>
                        <Input
                          id="gelir"
                          name="gelir"
                          type="number"
                          placeholder="Aylık net geliriniz"
                          value={formData.gelir}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="taksitTutari">Ödemek İstediğiniz Aylık Taksit Tutarı (TL) *</Label>
                        <Input
                          id="taksitTutari"
                          name="taksitTutari"
                          type="number"
                          min="2000"
                          placeholder="Minimum 2000 TL"
                          value={formData.taksitTutari}
                          onChange={handleChange}
                          required
                          className={formErrors.taksitTutari ? "border-red-500" : ""}
                        />
                        <p className="text-xs text-gray-500">Minimum 2000 TL olmalıdır</p>
                      </div>
                      
                      <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label htmlFor="krediVadesi">Talep Ettiğiniz Kredi Vadesi (Ay) *</Label>
                        <Input
                          id="krediVadesi"
                          name="krediVadesi"
                          type="number"
                          min="12"
                          max="24"
                          placeholder="12-24 ay arası"
                          value={formData.krediVadesi}
                          onChange={handleChange}
                          required
                          className={formErrors.krediVadesi ? "border-red-500" : ""}
                        />
                        <p className="text-xs text-gray-500">12-24 ay arasında bir değer giriniz</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handlePrevious}
                      >
                        Geri Dön
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-primary hover:bg-primary-dark text-white"
                        disabled={!isStepValid(2)}
                      >
                        Devam Et <ChevronRightIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Adım 3: Onay */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                      <h3 className="text-lg font-semibold mb-4">Başvuru Özeti</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Ad Soyad</p>
                          <p className="font-medium">{formData.ad} {formData.soyad}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">TC Kimlik No</p>
                          <p className="font-medium">{formData.tcKimlik}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Telefon</p>
                          <p className="font-medium">{formData.telefon}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">E-posta</p>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="kvkkOnay"
                          checked={formData.kvkkOnay}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('kvkkOnay', checked as boolean)
                          }
                          required
                        />
                        <div>
                          <Label
                            htmlFor="kvkkOnay"
                            className="text-sm font-normal leading-relaxed cursor-pointer"
                          >
                            Kişisel verilerimin, 6698 sayılı KVKK kapsamında, başvurumun değerlendirilmesi amacıyla işlenmesine ve anlaşmalı bankalara aktarılmasına izin veriyorum. *
                          </Label>
                          <p className="text-xs text-gray-500 mt-1">
                            <a href="/kvkk" className="text-primary hover:underline">
                              KVKK Aydınlatma Metni
                            </a>
                            'ni okudum ve anladım.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="pazarlamaIzni"
                          checked={formData.pazarlamaIzni}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('pazarlamaIzni', checked as boolean)
                          }
                        />
                        <Label
                          htmlFor="pazarlamaIzni"
                          className="text-sm font-normal leading-relaxed cursor-pointer"
                        >
                          Kredi puanım karşılığında ileride ulaşabileceğim bana özel Kampanya, indirim ve fırsatlardan haberdar olmak için elektronik iletişim kanalları üzerinden ticari elektronik ileti almayı kabul ediyorum.
                        </Label>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-semibold text-lg mb-3">Taahhütler</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Başvurunuzun değerlendirilebilmesi için aşağıdaki taahhütleri onaylamanız gerekmektedir.
                        </p>

                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              id="taahhut1"
                              checked={formData.taahhut1}
                              onCheckedChange={(checked) => 
                                handleCheckboxChange('taahhut1', checked as boolean)
                              }
                              required
                            />
                            <Label
                              htmlFor="taahhut1"
                              className="text-sm font-normal leading-relaxed cursor-pointer"
                            >
                              Aktif bir kredi ürünüm (kredi kartı, tüketici kredisi, taşıt kredisi, vs.) bulunmadığını ve bankalar ve finansal kuruluşlara aktif bir borcumun olmadığını beyan ederim. *
                            </Label>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              id="taahhut2"
                              checked={formData.taahhut2}
                              onCheckedChange={(checked) => 
                                handleCheckboxChange('taahhut2', checked as boolean)
                              }
                              required
                            />
                            <Label
                              htmlFor="taahhut2"
                              className="text-sm font-normal leading-relaxed cursor-pointer"
                            >
                              Son 5 yıl içerisinde kullanmış olduğum kredilerimin tümünü kapattığımı ve şu anda aktif bir kredi borcumun olmadığını beyan ederim. *
                            </Label>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              id="taahhut3"
                              checked={formData.taahhut3}
                              onCheckedChange={(checked) => 
                                handleCheckboxChange('taahhut3', checked as boolean)
                              }
                              required
                            />
                            <Label
                              htmlFor="taahhut3"
                              className="text-sm font-normal leading-relaxed cursor-pointer"
                            >
                              Hali hazırda kapanmamış yasal veya kanuni takipte bir kredi/kredi kartı borcum bulunmamaktadır *
                            </Label>
                          </div>
                        </div>

                        {!(formData.taahhut1 && formData.taahhut2 && formData.taahhut3) && (
                          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start">
                            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium">Uyarı</p>
                              <p className="text-sm">
                                Tüm taahhütleri onaylamazsanız, başvurunuz değerlendirmeye alınamayacaktır. 
                                Banka Findeks sorgusu sonucunda bu kriterlere uymadığınız tespit edilirse başvurunuz reddedilecektir.
                              </p>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <div className="text-sm font-medium flex items-center mt-2 cursor-help">
                                      Kimler başvuru yapabilir? <HelpCircle className="h-4 w-4 ml-1" />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent className="w-80 p-4 bg-white">
                                    <h4 className="font-bold mb-2">Programa Kimler Katılabilir?</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                      <li>Hiç kredi geçmişi olmayan gençler ve öğrenciler</li>
                                      <li>Daha önce kendi adına kredi kullanmamış ev hanımları</li>
                                      <li>Bugüne kadar hiç kredi kullanmamış kişiler</li>
                                      <li>Kredi puanı düşük olan ve iyileştirmek isteyenler</li>
                                      <li>Takibe düşmüş ve borcunu kapatmış olanlar</li>
                                    </ul>
                                    <p className="mt-2 italic text-sm">Aktif kredisi olanlar veya aktif takipte olanlar programa dahil edilemez.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800 text-sm">
                      <p>
                        <strong>Önemli Not:</strong> Başvurunuz gönderildikten sonra, anlaşmalı bankanın değerlendirme sürecine alınacaktır. Onay durumunuz ve sonraki adımlar hakkında size bilgilendirme yapılacaktır.
                      </p>
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handlePrevious}
                      >
                        Geri Dön
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-primary hover:bg-primary-dark text-white"
                        disabled={!isStepValid(3) || isSubmitting}
                      >
                        {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Tamamla'}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            <div className="mt-8 bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4">Anlaşmalı Bankalar</h2>
              <div className="flex flex-wrap gap-4">
                {[1, 2, 3, 4].map((bank) => (
                  <div key={bank} className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img src="/placeholder.svg" alt={`Banka ${bank}`} className="max-w-full max-h-full p-2" />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Başvurunuz, yukarıdaki anlaşmalı bankalarımızdan birine yönlendirilecektir. Tüm işlemler güvenli ve yasal çerçevede gerçekleştirilmektedir.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Apply;
