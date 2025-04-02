import React, { useState } from 'react';
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
  TrendingUp
} from 'lucide-react';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
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
  const [activeStep, setActiveStep] = useState(3);
  
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
                  <p className="text-primary font-medium">Banka Onayı Bekleniyor</p>
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
                <h3 className="font-medium text-gray-800">Şu anda: Banka Onayı Bekleniyor</h3>
                <p className="text-gray-600 mt-1">
                  Başvurunuz değerlendiriliyor. Bu süreçte telefonunuzu açık tutun, banka temsilcisi sizinle iletişime geçebilir. Ortalama bekleme süresi 1-3 iş günüdür.
                </p>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Başvuru Formunu Doldurdunuz</h4>
                    <p className="text-gray-600 text-sm">12.06.2023 - 14:35</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mr-3 mt-0.5">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Banka Onayını Bekleyin</h4>
                    <p className="text-gray-600 text-sm">Devam ediyor...</p>
                  </div>
                </div>
                
                <div className="flex items-start opacity-50">
                  <div className="bg-gray-100 rounded-full p-1 mr-3 mt-0.5">
                    <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Banka Müşterisi Olun</h4>
                    <p className="text-gray-600 text-sm">Başvurunuz onaylandığında</p>
                  </div>
                </div>
                
                <div className="flex items-start opacity-50">
                  <div className="bg-gray-100 rounded-full p-1 mr-3 mt-0.5">
                    <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Kredi Kullanımı ve Taksit Ödemeleri</h4>
                    <p className="text-gray-600 text-sm">Müşteri olduktan sonra</p>
                  </div>
                </div>
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
