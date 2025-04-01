
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { 
  CheckIcon, 
  ChevronRightIcon, 
  Clock, 
  ClipboardCheck, 
  UserCheck, 
  CreditCard, 
  Calendar, 
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
}

interface ApplicationData {
  id: string;
  status: string;
  application_date: string;
  result_date: string | null;
  amount: number;
  installment_count: number;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon, isActive, isCompleted }) => {
  return (
    <div className={`flex items-start p-5 rounded-lg transition-all ${
      isActive ? 'bg-primary-light border border-primary/30' : 'bg-white border border-gray-200'
    }`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ${
        isCompleted 
          ? 'bg-green-500 text-white' 
          : isActive 
            ? 'bg-primary text-white' 
            : 'bg-gray-200 text-gray-500'
      }`}>
        {isCompleted ? <CheckIcon size={18} /> : number}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="ml-auto">
            {icon}
          </div>
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

const Process: React.FC = () => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchApplication = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('credit_applications')
          .select('*')
          .eq('user_id', user.id)
          .order('application_date', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching application:', error);
          setError('Başvuru bilgileri alınamadı. Lütfen daha sonra tekrar deneyin.');
          return;
        }

        setApplication(data);
        
        // Set active step based on status
        if (data) {
          switch (data.status) {
            case 'pending':
              setActiveStep(2); // Banka Değerlendirmesi
              break;
            case 'accepted':
              setActiveStep(3); // Onay ve Müşteri Olma
              break;
            case 'active':
              setActiveStep(4); // Kredi Kullanımı
              break;
            case 'in_payment':
              setActiveStep(5); // Taksit Ödemeleri
              break;
            case 'completed':
              setActiveStep(6); // Kredibilite Oluşumu
              break;
            case 'rejected':
              setActiveStep(2); // Still at evaluation, but rejected
              break;
            default:
              setActiveStep(1);
          }
        }
      } catch (error) {
        console.error('Error in fetchApplication:', error);
        setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplication();
  }, [user]);
  
  const steps = [
    {
      number: 1,
      title: "Başvuru",
      description: "Başvuru formu doldurularak kredi talebi bankaya iletilir.",
      icon: <ClipboardCheck className="text-gray-400" size={20} />,
    },
    {
      number: 2,
      title: "Banka Değerlendirmesi",
      description: "Bankanın kredi başvurunuzu değerlendirme süreci.",
      icon: <Clock className="text-gray-400" size={20} />,
    },
    {
      number: 3,
      title: "Onay ve Müşteri Olma",
      description: "Başvurunuz onaylandığında banka müşterisi olma süreci.",
      icon: <UserCheck className="text-gray-400" size={20} />,
    },
    {
      number: 4,
      title: "Kredi Kullanımı",
      description: "Kredi aktifleştirilir ve bloke hesap oluşturulur.",
      icon: <CreditCard className="text-gray-400" size={20} />,
    },
    {
      number: 5,
      title: "Taksit Ödemeleri",
      description: "Aylık taksit ödemelerinin düzenli olarak yapılması.",
      icon: <Calendar className="text-gray-400" size={20} />,
    },
    {
      number: 6,
      title: "Kredibilite Oluşumu",
      description: "Düzenli ödemelerle Findeks puanı oluşturulur/yükselir.",
      icon: <TrendingUp className="text-gray-400" size={20} />,
    }
  ];

  const getStatusText = () => {
    if (!application) return "Başvuru Bulunamadı";
    
    switch (application.status) {
      case 'pending':
        return "Banka Onayı Bekleniyor";
      case 'accepted':
        return "Başvuru Onaylandı";
      case 'active':
        return "Kredi Kullanım Aşamasında";
      case 'in_payment':
        return "Taksit Ödemeleri Devam Ediyor";
      case 'completed':
        return "Kredi Tamamlandı";
      case 'rejected':
        return "Başvuru Reddedildi";
      default:
        return "Başvuru Durumu: " + application.status;
    }
  };

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

  if (error || !application) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                {error ? (
                  <Alert variant="destructive" className="mb-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Hata</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : (
                  <div className="text-center py-8">
                    <h2 className="text-xl font-semibold mb-4">Henüz bir başvurunuz bulunmuyor</h2>
                    <p className="text-gray-600 mb-6">
                      Kredi başvurusu yapmak için aşağıdaki butonu kullanabilirsiniz.
                    </p>
                    <Link to="/basvuru">
                      <Button className="bg-primary hover:bg-primary-dark text-white">
                        Başvuru Yap
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isRejected = application.status === 'rejected';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Süreç Takibi</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kredibilite oluşturma sürecinizi buradan takip edebilirsiniz. Her adım, finansal geleceğinizi inşa etmenin önemli bir parçasıdır.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-semibold">Başvuru Durumu</h2>
                  <p className={`font-medium ${isRejected ? 'text-red-500' : 'text-primary'}`}>
                    {getStatusText()}
                  </p>
                  {application.result_date && (
                    <p className="text-sm text-gray-500 mt-1">
                      {isRejected ? 'Reddedilme' : 'Onaylanma'} tarihi: {new Date(application.result_date).toLocaleDateString('tr-TR')}
                    </p>
                  )}
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Link to="/#faq">
                    <Button 
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      Yardım Al
                    </Button>
                  </Link>
                </div>
              </div>
              
              {isRejected && (
                <Alert variant="destructive" className="mb-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Başvurunuz Reddedildi</AlertTitle>
                  <AlertDescription>
                    Maalesef başvurunuz banka tarafından reddedilmiştir. Detaylı bilgi için müşteri hizmetleri ile iletişime geçebilirsiniz.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-4">
                {steps.map((step) => (
                  <Step
                    key={step.number}
                    number={step.number}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    isActive={step.number === activeStep}
                    isCompleted={step.number < activeStep}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-xl font-semibold mb-4">Yapmanız Gerekenler</h2>
              
              <div className="border-l-4 border-primary pl-4 py-2">
                <h3 className="font-medium text-gray-800">Şu anda: {getStatusText()}</h3>
                <p className="text-gray-600 mt-1">
                  {isRejected ? (
                    "Başvurunuz reddedildi. Belirli bir süre sonra tekrar başvurabilirsiniz veya müşteri hizmetlerinden detaylı bilgi alabilirsiniz."
                  ) : application.status === 'pending' ? (
                    "Başvurunuz değerlendiriliyor. Bu süreçte telefonunuzu açık tutun, banka temsilcisi sizinle iletişime geçebilir. Ortalama bekleme süresi 1-3 iş günüdür."
                  ) : application.status === 'accepted' ? (
                    "Başvurunuz onaylandı. Banka müşterisi olma sürecini tamamlamak için bankanın size ileteceği adımları takip edin."
                  ) : application.status === 'active' ? (
                    "Banka müşterisi oldunuz. Kredi kullanımı için banka tarafından belirtilen belgeleri hazırlayın."
                  ) : application.status === 'in_payment' ? (
                    "Taksit ödemelerinizi düzenli olarak yapın. Ödeme tarihlerini ve tutarlarını banka uygulamanızdan takip edebilirsiniz."
                  ) : application.status === 'completed' ? (
                    "Krediniz tamamlandı. Findeks puanınızı kontrol ederek kredibilite oluşumunuzu görebilirsiniz."
                  ) : (
                    "Başvurunuz işlemde. Lütfen son gelişmeler için banka ile iletişime geçin."
                  )}
                </p>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Başvuru Formunu Doldurdunuz</h4>
                    <p className="text-gray-600 text-sm">{new Date(application.application_date).toLocaleDateString('tr-TR')} - {new Date(application.application_date).toLocaleTimeString('tr-TR')}</p>
                  </div>
                </div>
                
                {application.status !== 'rejected' ? (
                  <>
                    <div className="flex items-start">
                      <div className={`${activeStep > 2 ? 'bg-green-100' : 'bg-blue-100'} rounded-full p-1 mr-3 mt-0.5`}>
                        {activeStep > 2 ? (
                          <CheckIcon className="h-4 w-4 text-green-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Banka Onayını {activeStep > 2 ? 'Aldınız' : 'Bekleyin'}</h4>
                        <p className="text-gray-600 text-sm">{activeStep > 2 ? application.result_date ? new Date(application.result_date).toLocaleDateString('tr-TR') : 'Onaylandı' : 'Devam ediyor...'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start opacity-50">
                      <div className={`${activeStep > 3 ? 'bg-green-100' : 'bg-gray-100'} rounded-full p-1 mr-3 mt-0.5`}>
                        {activeStep > 3 ? (
                          <CheckIcon className="h-4 w-4 text-green-600" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Banka Müşterisi Olun</h4>
                        <p className="text-gray-600 text-sm">{activeStep > 3 ? 'Tamamlandı' : 'Başvurunuz onaylandığında'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start opacity-50">
                      <div className={`${activeStep > 4 ? 'bg-green-100' : 'bg-gray-100'} rounded-full p-1 mr-3 mt-0.5`}>
                        {activeStep > 4 ? (
                          <CheckIcon className="h-4 w-4 text-green-600" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Kredi Kullanımı ve Taksit Ödemeleri</h4>
                        <p className="text-gray-600 text-sm">{activeStep > 4 ? 'Tamamlandı' : 'Müşteri olduktan sonra'}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-start">
                    <div className="bg-red-100 rounded-full p-1 mr-3 mt-0.5">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Başvurunuz Reddedildi</h4>
                      <p className="text-gray-600 text-sm">{application.result_date ? new Date(application.result_date).toLocaleDateString('tr-TR') : 'Tarih bilgisi yok'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4">Sıkça Sorulan Sorular</h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="font-medium text-gray-800 mb-2">Ne kadar sürede cevap alacağım?</h3>
                  <p className="text-gray-600">
                    Başvurunuz genellikle 1-3 iş günü içerisinde değerlendirilir ve size e-posta veya SMS yoluyla bilgilendirme yapılır.
                  </p>
                </div>
                
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="font-medium text-gray-800 mb-2">Başvurum onaylanırsa ne yapmalıyım?</h3>
                  <p className="text-gray-600">
                    Başvurunuz onaylandığında, size iletilecek bağlantı üzerinden bankanın mobil uygulamasını indirmeniz ve uzaktan müşteri olma sürecini tamamlamanız gerekecek.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Başvurum reddedilirse ne olur?</h3>
                  <p className="text-gray-600">
                    Başvurunuzun reddedilmesi durumunda, sebepleri size bildirilecektir. İsterseniz belirli bir süre sonra tekrar başvurabilir veya başka bir banka üzerinden süreci tekrar başlatabilirsiniz.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-4">Başka sorularınız mı var?</p>
                <Link to="/#faq">
                  <Button variant="outline">
                    Tüm SSS'leri Görüntüle
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
};

export default Process;
