
import React from 'react';
import { Shield, TrendingUp, Percent, AlertCircle, Home, Building } from 'lucide-react';

const CreditScoreBenefits: React.FC = () => {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Finansal Güvenilirlik Kazanırsınız",
      description: "Kredi skoru, bankalar ve finansal kuruluşlar için sizin finansal geçmişinizi gösteren bir referanstır. Düzenli ödeme alışkanlığı göstererek oluşturduğunuz skor, sizin güvenilir bir müşteri olduğunuzu kanıtlar."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Krediye Erişim İmkânınız Artar",
      description: "Skorunuz yükseldikçe kredi kartı, ihtiyaç kredisi, konut kredisi gibi ürünlere erişiminiz kolaylaşır. Ayrıca daha uygun faiz oranları ve daha yüksek limitler talep etme şansınız olur."
    },
    {
      icon: <Percent className="h-6 w-6" />,
      title: "Faiz Oranlarında Avantaj Sağlar",
      description: "Yüksek kredi skoruna sahip bireyler, düşük riskli olarak değerlendirilir. Bu da bankaların size daha uygun faiz oranları sunmasına neden olur."
    },
    {
      icon: <AlertCircle className="h-6 w-6" />,
      title: "Acil Durumlara Karşı Hazırlıklı Olursunuz",
      description: "Ani bir sağlık harcaması, iş kaybı ya da başka beklenmedik durumlarda krediye ihtiyaç duyabilirsiniz. İyi bir skor, acil durumlarda daha hızlı finansal destek alabilmenizi sağlar."
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: "Kira ve Abonelik Başvurularında Kolaylık",
      description: "Bazı ev sahipleri ve hizmet sağlayıcılar (internet, GSM operatörleri vb.), başvuru yapan kişinin finansal geçmişini dikkate alır. Pozitif bir kredi skoru, güven sağlar."
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Kredi Geçmişinizi Güçlü Temellere Oturtursunuz",
      description: "Kredi puanı oluşturmak, gelecekte daha büyük finansal adımlar (örneğin ev veya araba kredisi) için sağlam bir altyapı oluşturur. SkorUp gibi sistemlerle atılan küçük adımlar, zamanla büyük fırsatlara dönüşebilir."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Neden Kredi Skorumu Oluşturmalıyım?
          </h2>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">
              Skor Oluşturmanın Avantajları
            </h3>
            <p className="text-lg leading-relaxed text-gray-700 mb-8">
              Finansal geçmişiniz ne olursa olsun, güvenilir bir kredi skoru oluşturmak hem bugünkü ihtiyaçlarınız hem de 
              gelecekteki planlarınız için büyük bir fark yaratır. SkorUp olarak, kredi skoru olmayan ya da düşük olan 
              bireylerin kredibilite kazanmalarına destek oluyoruz. Peki, kredi skoru oluşturmanın avantajları nelerdir?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-primary-light text-primary rounded-lg flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h4 className="text-lg font-semibold text-primary-dark mb-3">
                {benefit.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Unutmayın!
          </h3>
          <p className="text-lg leading-relaxed mb-6 max-w-4xl mx-auto">
            Skor oluşturmak, sadece borçlanmak değil, aynı zamanda finansal disiplini göstermek demektir. 
            SkorUp ile siz de ilk adımı atabilir, kredibilite yolculuğunuzu bugünden başlatabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/basvuru" 
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Hemen Başvur
            </a>
            <a 
              href="/blog" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors inline-block"
            >
              Daha Fazla Bilgi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditScoreBenefits;
