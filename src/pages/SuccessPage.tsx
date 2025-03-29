
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

const SuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Başvurunuz Alındı!
              </h1>
              
              <p className="text-gray-600 mb-6">
                Başvurunuz başarıyla tamamlandı ve ilgili bankaya iletildi. Vermiş olduğunuz iletişim bilgileri üzerinden banka yetkilileri en kısa sürede sizinle irtibata geçeceklerdir.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-blue-700 mb-2">Sonraki Adımlar</h3>
                <ul className="text-blue-700 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">📱</span>
                    <span>Telefonunuzu açık tutun, banka yetkilisi arayabilir.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">📧</span>
                    <span>E-posta kutunuzu kontrol edin, onay bilgileri gönderilecektir.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⏱️</span>
                    <span>Başvurunuzun değerlendirilme süresi ortalama 1-3 iş günüdür.</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" className="w-full">
                    Ana Sayfaya Dön
                  </Button>
                </Link>
                <Link to="/#faq">
                  <Button className="w-full bg-primary text-white">
                    Sıkça Sorulan Sorular
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

export default SuccessPage;
