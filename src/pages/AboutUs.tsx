
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ExternalLink, Linkedin, Twitter } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-light py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-6">
                Biz Kimiz?
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Finansal sektördeki deneyimimizle, kredibilite oluşturma konusunda Türkiye'nin en güvenilir çözümünü sunuyoruz.
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-4 text-primary">Misyonumuz</h2>
                <p className="text-gray-700 mb-4">
                  Finansal sisteme erişimde zorluk yaşayan bireylere, kredibilite oluşturma konusunda yenilikçi, güvenilir ve ulaşılabilir çözümler sunarak finansal kapsayıcılığı artırmak.
                </p>
                <p className="text-gray-700">
                  Hiç kredi kullanmamış veya finansal geçmişi olmayan kişilerin, ekonomik sistem içerisinde yer alabilmelerini ve gelecekte ihtiyaç duyabilecekleri kredilere erişebilmelerini sağlamak için var gücümüzle çalışıyoruz.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Vizyonumuz</h2>
                <p className="text-gray-700 mb-4">
                  Türkiye'nin en büyük ve en güvenilir kredibilite oluşturma platformu olmak ve finansal eğitimi yaygınlaştırarak bireylerin finansal özgürlüğüne katkıda bulunmak.
                </p>
                <p className="text-gray-700">
                  Her bireyin finansal geçmişinden bağımsız olarak, finansal sisteme entegre olabildiği, kredibilite oluşturabildiği ve ekonomik fırsatlara eşit şekilde erişebildiği bir Türkiye hayal ediyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Founder Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Kurucumuz</h2>
                <p className="text-gray-600">
                  Finans sektöründeki 20 yılı aşkın deneyimiyle, Türkiye'nin kredibilite çözümünü geliştiren liderimiz.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-1 h-64 md:h-auto">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center p-4">
                      <img src="/placeholder.svg" alt="Koray Kaya" className="max-w-full max-h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">Koray Kaya</h3>
                        <p className="text-primary font-medium">Kurucu & CEO</p>
                      </div>
                      
                      <div className="flex space-x-3 mt-3 md:mt-0">
                        <a 
                          href="https://linkedin.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-[#0077B5] text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
                        >
                          <Linkedin size={18} />
                        </a>
                        <a 
                          href="https://twitter.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-[#1DA1F2] text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
                        >
                          <Twitter size={18} />
                        </a>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      Koray Kaya, Türkiye'nin önde gelen bankalarında 20 yılı aşkın deneyime sahip bir finans uzmanıdır. Kariyeri boyunca kredi süreçleri, risk yönetimi ve finansal kapsayıcılık alanlarında önemli projelere liderlik etmiştir.
                    </p>
                    
                    <p className="text-gray-700 mb-6">
                      Finans sektöründeki deneyimi ve gözlemleri sonucunda, hiç kredi kullanmamış veya finansal geçmişi olmayan kişilerin yaşadığı zorlukları tespit etmiş ve bu sorunu çözmek için KrediBuild platformunu kurmuştur. Amacı, finansal sisteme dahil olmakta zorlanan kişilere yenilikçi ve güvenli bir çözüm sunmaktır.
                    </p>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Kariyer Geçmişi</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <span className="w-24 text-gray-500">2018-2023</span>
                          <span>Risk Yönetimi Direktörü, XYZ Bank</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-24 text-gray-500">2010-2018</span>
                          <span>Bireysel Krediler Müdürü, ABC Bank</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-24 text-gray-500">2003-2010</span>
                          <span>Kredi Tahsis Uzmanı, DEF Bank</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Neden Bize Güvenmelisiniz?</h2>
                <p className="text-gray-600">
                  KrediBuild, finansal sektördeki uzmanlar tarafından kurulmuş, şeffaf ve güvenilir bir platformdur.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Güvenli ve Yasal</h3>
                  <p className="text-gray-600">
                    Tüm işlemlerimiz Türkiye'nin düzenleyici otoriteleri tarafından denetlenen anlaşmalı bankalar üzerinden yapılmaktadır. Kişisel verileriniz KVKK kapsamında korunmaktadır.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Tam Şeffaflık</h3>
                  <p className="text-gray-600">
                    Her süreç adımı, maliyet ve koşul açıkça belirtilmektedir. Gizli ücretler veya beklenmedik maliyetler yoktur. Sadece belirtilen işlem komisyonu alınır, başka bir ücret ödenmez.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Bankalarla İşbirliği</h3>
                  <p className="text-gray-600">
                    Türkiye'nin önde gelen bankaları ile resmi işbirliği içerisindeyiz. Tüm kredi işlemleri bu bankalar aracılığıyla, yasal mevzuata uygun şekilde gerçekleştirilir.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Uzun Vadeli Çözüm</h3>
                  <p className="text-gray-600">
                    Sadece geçici bir çözüm değil, uzun vadeli bir finansal gelecek için temel oluşturuyoruz. Programımız, sürdürülebilir finansal alışkanlıklar geliştirmenize yardımcı olur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Kredibilite Yolculuğunuza Bugün Başlayın
            </h2>
            <p className="text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
              Finansal geleceğinizi sağlam temeller üzerine inşa etmek için ilk adımı atın. 
              Uzman ekibimiz, süreç boyunca size rehberlik edecektir.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/basvuru">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 transition-colors">
                  Hemen Başvur
                </Button>
              </Link>
              <Link to="/surec">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-colors">
                  Süreci İncele
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
