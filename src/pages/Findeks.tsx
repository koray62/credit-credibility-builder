import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { TrendingUp, HelpCircle, CheckCircle } from 'lucide-react';
import FindeksUploader from '../components/FindeksUploader';

const Findeks: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Findeks Raporu</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Findeks puanınızı takip edin, raporlarınızı yükleyin ve finansal sağlığınızı izleyin.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Rapor Yükleme */}
              <div className="lg:col-span-2">
                <FindeksUploader />
                
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <TrendingUp className="mr-2 text-primary" />
                    Findeks Puanı Nedir?
                  </h2>
                  
                  <div className="prose max-w-none text-gray-700">
                    <p className="mb-4">
                      Findeks Kredi Notu, Türkiye'nin ulusal kredi bürosu olan KKB (Kredi Kayıt Bürosu) tarafından hesaplanan, finansal güvenilirliğinizin bir göstergesidir. Bu puan, bankalar ve diğer finansal kuruluşlar tarafından kredi verme kararlarında dikkate alınır.
                    </p>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Findeks Puanı Nasıl Hesaplanır?</h3>
                    <p className="mb-4">
                      Findeks puanı, 0-1900 arasında değişen bir skorlama sistemine dayanır ve şu faktörler dikkate alınarak hesaplanır:
                    </p>
                    
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li><strong>Ödeme Geçmişi (35%):</strong> Geçmiş kredilerinizin ödemelerini zamanında yapıp yapmadığınız.</li>
                      <li><strong>Mevcut Borçlar (30%):</strong> Toplam borcunuzun gelirinize veya kredi limitinize oranı.</li>
                      <li><strong>Kredi Geçmişinin Uzunluğu (15%):</strong> Ne kadar süredir kredi kullandığınız.</li>
                      <li><strong>Yeni Krediler (10%):</strong> Son dönemde açtığınız kredi hesaplarının sayısı.</li>
                      <li><strong>Kredi Çeşitliliği (10%):</strong> Kullandığınız kredi türlerinin çeşitliliği (tüketici kredisi, kredi kartı, konut kredisi vb.)</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Findeks Puanı Aralıkları</h3>
                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Puan Aralığı</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Risk Durumu</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Kredi Alma Olasılığı</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">1661-1900</td>
                            <td className="border border-gray-300 px-4 py-2">Çok Düşük Risk</td>
                            <td className="border border-gray-300 px-4 py-2">Çok Yüksek</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">1521-1660</td>
                            <td className="border border-gray-300 px-4 py-2">Düşük Risk</td>
                            <td className="border border-gray-300 px-4 py-2">Yüksek</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">1241-1520</td>
                            <td className="border border-gray-300 px-4 py-2">Orta Risk</td>
                            <td className="border border-gray-300 px-4 py-2">Orta</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">1101-1240</td>
                            <td className="border border-gray-300 px-4 py-2">Yüksek Risk</td>
                            <td className="border border-gray-300 px-4 py-2">Düşük</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-4 py-2">1-1100</td>
                            <td className="border border-gray-300 px-4 py-2">Çok Yüksek Risk</td>
                            <td className="border border-gray-300 px-4 py-2">Çok Düşük</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Findeks Puanını Yükseltmek İçin İpuçları</h3>
                    <ol className="list-decimal pl-6 space-y-2 mb-4">
                      <li><strong>Ödemelerinizi Zamanında Yapın:</strong> En önemli faktör, kredilerinizin ve kredi kartlarınızın ödemelerini zamanında yapmaktır.</li>
                      <li><strong>Borç Oranınızı Düşük Tutun:</strong> Kredi limitinizin %30'undan fazlasını kullanmamaya çalışın.</li>
                      <li><strong>Kredi Geçmişi Oluşturun:</strong> Eğer hiç kredi kullanmadıysanız, KrediBuild programımız ile güvenli bir şekilde kredi geçmişi oluşturabilirsiniz.</li>
                      <li><strong>Eski kredi kartlarınızı kapatmayın:</strong> Kredi tarihçeniz ne kadar eski ise kredi notunuza katkısı o kadar yüksek olur.</li>
                      <li><strong>Düzenli Olarak Kredi Raporunuzu Kontrol Edin:</strong> Hataları fark etmek ve düzeltmek için düzenli kontrol önemlidir.</li>
                    </ol>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Findeks Raporu Nasıl Alınır?</h3>
                  <p className="text-gray-600 mb-4">
                    Findeks raporunuzu kolayca alabilir ve finansal durumunuzu öğrenebilirsiniz.
                  </p>
                  <ol className="space-y-4 mb-6">
                    <li className="flex items-start">
                      <div className="bg-primary-light text-primary rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3 mt-0.5 flex-shrink-0">1</div>
                      <p className="text-gray-700">Findeks.com adresini ziyaret edin ve üye olun.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary-light text-primary rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3 mt-0.5 flex-shrink-0">2</div>
                      <p className="text-gray-700">Kimlik doğrulama adımlarını tamamlayın.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary-light text-primary rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3 mt-0.5 flex-shrink-0">3</div>
                      <p className="text-gray-700">Kredi Raporu ürününü seçin ve satın alın.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary-light text-primary rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3 mt-0.5 flex-shrink-0">4</div>
                      <p className="text-gray-700">Raporunuzu PDF olarak indirin.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary-light text-primary rounded-full w-6 h-6 flex items-center justify-center font-medium mr-3 mt-0.5 flex-shrink-0">5</div>
                      <p className="text-gray-700">İndirdiğiniz PDF raporunu bu sayfaya yükleyin.</p>
                    </li>
                  </ol>
                  <a 
                    href="https://www.findeks.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-center"
                  >
                    <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                      Findeks.com'u Ziyaret Et
                    </Button>
                  </a>
                </div>
                
                <div className="bg-gradient-to-br from-primary to-secondary rounded-xl shadow-md p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">Kredibilite Oluşturma Programı</h3>
                  <p className="mb-6 opacity-90">
                    Hiç kredi kullanmadıysanız veya kredi puanınız düşükse, programımız ile güvenli bir şekilde kredibilite oluşturabilirsiniz.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Sıfır faiz avantajı</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Kredi tutarından kesilen 1000 TL işlem ücreti</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Anlaşmalı bankalarla güvenli işlem</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Findeks puanınızı yükseltin</span>
                    </li>
                  </ul>
                  <a href="/basvuru" className="block text-center">
                    <Button className="w-full bg-white text-primary hover:bg-gray-100 transition-colors">
                      Hemen Başvur
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Findeks;
