
import React from 'react';
import { GraduationCap, Home, Users, TrendingDown, CheckCircle } from 'lucide-react';

interface AudienceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const AudienceCard: React.FC<AudienceCardProps> = ({ title, description, icon, isActive = true }) => {
  return (
    <div className={`rounded-lg p-6 transition-all duration-300 ${
      isActive 
        ? 'bg-white shadow-md border border-gray-100 hover:shadow-lg' 
        : 'bg-gray-100 border border-gray-200 opacity-75'
    }`}>
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full mr-4 ${isActive ? 'bg-primary-light text-primary' : 'bg-gray-200 text-gray-500'}`}>
          {icon}
        </div>
        <h3 className={`text-xl font-semibold ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>{title}</h3>
      </div>
      <p className={isActive ? 'text-gray-600' : 'text-gray-500'}>{description}</p>
    </div>
  );
};

const TargetAudience: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kimler İçin Uygun?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            KrediBuild programı aşağıdaki kişiler için özel olarak tasarlanmıştır.
            Sizin durumunuza uygun bir çözüm sunuyoruz.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AudienceCard
            title="Gençler ve Öğrenciler"
            description="Hiç kredi geçmişi olmayan, finansal hayata yeni başlayan gençler ve üniversite öğrencileri için ideal."
            icon={<GraduationCap className="h-6 w-6" />}
          />
          
          <AudienceCard
            title="Ev Hanımları"
            description="Daha önce kendi adına kredi kullanmamış veya finansal kimlik oluşturmamış ev hanımları için mükemmel fırsat."
            icon={<Home className="h-6 w-6" />}
          />
          
          <AudienceCard
            title="Kredi Kullanmamış Bireyler"
            description="Herhangi bir sebepten dolayı bugüne kadar hiç kredi kullanmamış ve kredi puanı oluşturmamış kişiler."
            icon={<Users className="h-6 w-6" />}
          />
          
          <AudienceCard
            title="Kredi Notu Düşük Kişiler"
            description="Kredi puanı düşük olup, kredibilitesini yükseltmek ve iyileştirmek isteyen bireyler için çözüm."
            icon={<TrendingDown className="h-6 w-6" />}
          />
          
          <AudienceCard
            title="Takibi Kapanmış Olanlar"
            description="Geçmişte takibe düşmüş ancak borçlarını kapatmış ve kredibilitelerini yeniden oluşturmak isteyen kişiler."
            icon={<CheckCircle className="h-6 w-6" />}
          />
          
          <AudienceCard
            title="Aktif Kredisi Olanlar"
            description="Halihazırda aktif bir kredi ürünü kullanan veya aktif takibi devam eden kişiler program kapsamında değildir."
            icon={<CheckCircle className="h-6 w-6" />}
            isActive={false}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-primary-light">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-6 md:mb-0 md:pr-6">
              <div className="bg-primary p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold mb-3 text-center md:text-left">Emin Değil misiniz?</h3>
              <p className="text-gray-600 mb-4">
                Durumunuzun programa uygun olup olmadığını anlayabilmek için aşağıdaki kriterleri kontrol edin. Eğer hiç kredi kullanmadıysanız veya son 5 yıldır aktif bir krediniz yoksa, bu program tam size göre!
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>18 yaşından büyüksünüz</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Hiç kredi kullanmadınız veya son 5 yıldır aktif bir krediniz yok</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Aktif bir takipte değilsiniz (eğer geçmişte takibe düştüyseniz ve kapattıysanız uygundur)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
