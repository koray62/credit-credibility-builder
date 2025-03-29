
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Finansal Geleceğinizi Bugün İnşa Etmeye Başlayın
        </h2>
        
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Kredibilite puanınızı oluşturmak için ilk adımı atın. Anlaşmalı bankalarımız
          aracılığıyla sıfır faizli kredi kullanarak finansal kimliğinizi oluşturun.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/basvuru">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 transition-colors">
              Hemen Başvur
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          
          <Link to="/biz-kimiz">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-colors">
              Daha Fazla Bilgi Al
            </Button>
          </Link>
        </div>
        
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full p-2 mr-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <span>Kolay başvuru süreci</span>
          </div>
          
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full p-2 mr-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <span>Sıfır faiz avantajı</span>
          </div>
          
          <div className="flex items-center">
            <div className="bg-white/20 rounded-full p-2 mr-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <span>Güvenli banka işlemleri</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
