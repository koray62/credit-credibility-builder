
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-primary-light to-white pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-8 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark leading-tight mb-6 animate-fade-in">
              Findeks Notunuzu Oluşturun, <span className="text-secondary">Finansal Geleceğinizi</span> Güvence Altına Alın
            </h1>
            
            <p className="text-gray-700 text-lg md:text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Findeks notunuz yoksa endişelenmeyin. SkorUp ile kredi puanınızı güvenli, risksiz ve ücretsiz bir şekilde oluşturmaya başlayın. Kredi notunun hayatınıza katacağı avantajlardan faydalanın.
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
              <p className="text-gray-700">
                <span><strong>Nasıl?:</strong> SkorUp aracılığıyla, kredi puanınızı oluşturmaya yönelik sıfır faizli özel bir kredi ile anlaşmalı bankalardan kredi hesabı açarak Findeks notunuzu oluşturmaya başlayabilirsiniz. </span>
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Kredi Puanınız</h3>
                  <p className="text-gray-500 text-sm">Puanınızı görmek için Findeks Risk Raporunuzu yükleyin</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center my-8">
                <div className="w-48 h-48 rounded-full bg-gray-100 border-8 border-primary flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-dark">1125</div>
                    <div className="text-gray-500 text-sm">Mevcut Puan</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">İlerleme</span>
                  <span className="text-gray-600">1125/1900</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden relative">
                  {/* Progress bar with color gradient */}
                  <div className="w-full h-full absolute">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        background: 'linear-gradient(to right, #ea384c, #F97316, #FEF7CD, #F2FCE2, #48bb78)'
                      }}
                    ></div>
                  </div>
                  
                  {/* Score indicator - positioned proportionally based on current score */}
                  <div 
                    className="absolute top-0 transform -translate-y-1/2" 
                    style={{ 
                      left: `${(1125 / 1900) * 100}%`,
                    }}
                  >
                    <div className="w-3 h-3 bg-black transform rotate-45 translate-y-1"></div>
                  </div>
                </div>
                
                {/* Score scale labels - positioned proportionally */}
                <div className="flex text-xs text-gray-500 mt-1 relative">
                  <span className="absolute" style={{ left: '0%' }}>0</span>
                  <span className="absolute" style={{ left: '25%', transform: 'translateX(-50%)' }}>500</span>
                  <span className="absolute" style={{ left: '50%', transform: 'translateX(-50%)' }}>1000</span>
                  <span className="absolute" style={{ left: '75%', transform: 'translateX(-50%)' }}>1500</span>
                  <span className="absolute" style={{ left: '100%', transform: 'translateX(-100%)' }}>1900</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Programı Tamamlayınca</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Hedef Puan: 1320+</span>
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
