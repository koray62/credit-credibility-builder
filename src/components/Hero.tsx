
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-primary-light to-white pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-8 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark leading-tight mb-6 animate-fade-in">
              Kredibilite Oluşturun, <span className="text-secondary">Finansal Geleceğinizi</span> Güvence Altına Alın
            </h1>
            
            <p className="text-gray-700 text-lg md:text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Hiç kredi kullanmadınız mı? Son 5 yıldır aktif kredisi olmayan biri misiniz? 
              Endişelenmeyin! Kredibilite puanınızı hızlıca oluşturmanız için buradayız.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Link to="/basvuru">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white transition-all duration-300">
                  Hemen Başvur
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/biz-kimiz">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white transition-all duration-300">
                  Daha Fazla Bilgi Al
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <p className="text-gray-700 flex items-center">
                <svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Güvenli süreç:</strong> SkorUp platformunda tüm işlemler anlaşmalı kurumlar üzerinden yapılmakta, herhangi bir ücret talep edilmemekte ve kullanıcı bilgileri KVKK kapsamında güvenli bir şekilde saklanmaktadır.</span>
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Kredi Puanınız</h3>
                  <p className="text-gray-500 text-sm">Simülasyon</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center my-8">
                <div className="w-48 h-48 rounded-full bg-gray-100 border-8 border-primary flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-dark">1200</div>
                    <div className="text-gray-500 text-sm">Mevcut Puan</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">İlerleme</span>
                  <span className="text-gray-600">1200/1900</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: '63%',
                      background: 'linear-gradient(to right, #e53e3e, #ecc94b, #48bb78)'
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Programı Tamamlayınca</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Hedef Puan: 1300+</span>
                  </div>
                  <span className="text-gray-700">12 ay içinde</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
