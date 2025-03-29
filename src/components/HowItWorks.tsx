
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const Step: React.FC<StepProps> = ({ number, title, description, isLast = false }) => {
  return (
    <div className="flex flex-col items-center text-center relative">
      <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 z-10">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      
      {!isLast && (
        <div className="hidden md:flex absolute top-8 left-[calc(100%_-_2rem)] items-center">
          <ArrowRight className="text-primary w-8 h-8" />
        </div>
      )}
    </div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nasıl Çalışır?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kredibilite puanınızı oluşturmak için izlemeniz gereken adımlar çok basit.
            Aşağıdaki süreci takip ederek finansal geleceğinizi güvence altına alın.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          <Step 
            number={1}
            title="Ücretsiz olarak Başvurunuzu Yapın"
            description="Formu doldurun ve kredi başvurusunu anlaşmalı bankaya iletin. Tüm süreç online olarak ilerleyecek."
          />
          
          <Step 
            number={2}
            title="Onay ve Aktivasyon"
            description="Başvurunuz onaylandıktan sonra, bankanın mobil uygulaması üzerinden kredinizi kullanın."
          />
          
          <Step 
            number={3}
            title="Düzenli Ödeme ve Kazanım"
            description="Taksitlerinizi zamanında ödeyerek Findeks puanınızı yükseltin ve finansal güvenilirliğinizi oluşturun."
            isLast
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
