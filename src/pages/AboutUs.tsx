
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Youtube } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Biz Kimiz</h1>
              
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  SkorUp, finansal sektördeki uzmanlar tarafından kurulmuş, şeffaf ve güvenilir bir platformdur. 
                  Amacımız, kredi geçmişi olmayan veya düşük kredi puanına sahip bireylerin finansal 
                  kredibilitelerini iyileştirmelerine yardımcı olmaktır.
                </p>
                
                <p className="mb-4">
                  Bu platform, yalnızca resmi iş ortaklığı bulunan bankalar üzerinden işlem yapar ve kullanıcı 
                  bilgileri KVKK kapsamında güvenli bir şekilde saklanır.
                </p>
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Misyonumuz</h2>
                <p className="mb-4">
                  Finansal sisteme dahil olmakta zorlanan bireylerin kredi puanlarını oluşturmalarına 
                  veya iyileştirmelerine yardımcı olarak, onların gelecekteki finansal ihtiyaçlarına 
                  daha kolay erişim sağlamalarını amaçlıyoruz.
                </p>
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Vizyonumuz</h2>
                <p className="mb-4">
                  Finansal okuryazarlığı artırarak ve kredi kullanım bilincini yükselterek, 
                  daha sürdürülebilir ve adil bir ekonomik sisteme katkıda bulunmayı hedefliyoruz.
                </p>
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Kurucumuz</h2>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 py-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img 
                      src="/placeholder.svg" 
                      alt="Koray Kaya" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Koray Kaya</h3>
                    <p className="mb-4">
                      SkorUp kurucusu Koray Kaya, Türkiye'nin önde gelen bankalarında 30 yıla yakın deneyime sahip bir finans uzmanıdır. Kredi Kayt Bürosu'nda 10 yılı aşkın süre Genel Müdür Yardımcısı olarak görev yaptığı dönemde Findeks'i kurmuş ve kredi okur yazarlık haftası projesini hayata geçirerek Türkiye'de kredi bilincinin oluşturulması konusunda farklı faaliyetlerde bulunmuştur.
                    </p>
                    
                    <div className="flex space-x-3">
                      <a 
                        href="https://twitter.com/koraykaya" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        <Twitter size={20} />
                      </a>
                      <a 
                        href="https://linkedin.com/in/koraykaya" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a 
                        href="https://youtube.com/user/koraykaya" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        <Youtube size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mt-8 mb-4">Değerlerimiz</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Şeffaflık:</strong> Tüm işlemlerimizde açık ve dürüst olmayı taahhüt ediyoruz.
                  </li>
                  <li>
                    <strong>Güvenilirlik:</strong> Kullanıcılarımızın verilerinin güvenliği bizim için en önemli önceliktir.
                  </li>
                  <li>
                    <strong>Erişilebilirlik:</strong> Finansal hizmetleri daha fazla kişi için erişilebilir kılmak için çalışıyoruz.
                  </li>
                  <li>
                    <strong>Yenilikçilik:</strong> Sürekli olarak daha iyi hizmet sunmak için yeni çözümler geliştiriyoruz.
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  className="bg-primary text-white"
                  asChild
                >
                  <a href="mailto:info@skorup.org">
                    Bizimle İletişime Geçin
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="bg-primary-light rounded-xl p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">Güven ve Şeffaflığa Dayalı Hizmet</h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Tüm işlemlerimiz anlaşmalı bankalarımız aracılığıyla yapılmaktadır. Amacımız, 
                finansal sisteme dahil olmakta zorlanan bireylerin kredi geçmişi oluşturmalarını sağlamaktır.
              </p>
              <Button 
                className="bg-primary text-white"
                asChild
              >
                <Link to="/basvuru">Hemen Başvur</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
