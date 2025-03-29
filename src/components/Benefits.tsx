
import React from 'react';
import BenefitCard from './BenefitCard';
import { TrendingUp, Award, Clock, ShieldCheck } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      title: "Kredibilite Oluşturma",
      description: "Hiç kredi geçmişiniz olmasa bile sıfırdan bir kredi puanı oluşturabilirsiniz.",
      icon: <TrendingUp className="h-7 w-7" />,
      benefits: [
        "Findeks puanınızı sıfırdan oluşturma",
        "Bankalarda kredi skorunuzu yükseltme",
        "Gelecekte kredi skorunun sağlayacağı farklı fırsatlara erişim",
        "Finansal kimliğinizi oluşturma"
      ]
    },
    {
      title: "Sıfır Faiz Avantajı",
      description: "Programımızda kullandığınız krediler için hiçbir faiz ödemesi yapmazsınız.",
      icon: <Award className="h-7 w-7" />,
      benefits: [
        "Sadece krediden kesilecek olan 1000 TL işlem komisyonu",
        "Faiz yükü olmayan geri ödeme planı",
        "Taksitler ödenip kredi kapanınca bloke çözülür",
        "Vade sonunda ödediğiniz tüm taksitler size geri döner"
      ]
    },
    {
      title: "Esnek Süreç",
      description: "Size uygun bir ödeme planıyla kredi puanınızı oluşturabilirsiniz.",
      icon: <Clock className="h-7 w-7" />,
      benefits: [
        "12-24 ay arası esnek vadeler",
        "Kendi ödeme takviminizie göre planlama",
        "Erken kapatma seçeneği",
        "Aylık olarak ödeyebileceğin taksit tutarını sen belirle",
        "Ne kadar yüksek taksit ödersen o kadar fazla birikim yapmış olursun"
      ]
    },
    {
      title: "Tam Güvenlik",
      description: "Tüm süreç anlaşmalı bankalar üzerinden yürütülerek maksimum güvenlik sağlanır.",
      icon: <ShieldCheck className="h-7 w-7" />,
      benefits: [
        "Anlaşmalı bankalarla güvenli işlem",
        "Kişisel verilerin korunması",
        "Şeffaf ve yasal süreç"
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Neden SkorUp?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kredi geçmişi olmayan veya uzun süredir kredi kullanmayan kişiler için
            özel olarak tasarlanmış avantajlı çözümlerimizle tanışın.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              benefits={benefit.benefits}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
