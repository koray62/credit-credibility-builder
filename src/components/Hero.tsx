
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFindeksScore } from '@/hooks/useFindeksScore';

const Hero: React.FC = () => {
  const { findeksScore, isLoading } = useFindeksScore();
  
  // Calculate progress percentage (Findeks score is 0-1900, we'll map it to 0-100%)
  const getScorePercentage = (score: number | null) => {
    if (!score) return 0;
    return Math.min((score / 1900) * 100, 100);
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return 'from-gray-400 to-gray-500';
    if (score < 1100) return 'from-red-500 to-red-600';
    if (score < 1240) return 'from-orange-500 to-orange-600';
    if (score < 1520) return 'from-yellow-500 to-yellow-600';
    if (score < 1660) return 'from-blue-500 to-blue-600';
    return 'from-green-500 to-green-600';
  };

  const getScoreText = (score: number | null) => {
    if (isLoading) return 'Yükleniyor...';
    if (!score) return 'Henüz puan yok';
    return score.toString();
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary text-white py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sol Taraf - İçerik */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Kredi Skorunuzu
                <span className="block text-accent"> Sıfır Faizle</span>
                Oluşturun
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                Hiç kredi kullanmadınız mı? Kredi notunuz düşük mü? 
                <span className="font-semibold text-white"> SkorUp</span> ile güvenilir kredi geçmişi oluşturun!
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-3">💡 Puanınızı görmek için Findeks Risk Raporunuzu <Link to="/findeks" className="text-accent underline hover:text-accent/80 transition-colors cursor-pointer">yükleyin</Link></h3>
                <p className="text-gray-200">
                  Mevcut kredi puanınızı öğrenin ve gelişim alanlarınızı keşfedin.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/basvuru">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center group">
                  Hemen Başvur
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/hakkimizda">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                >
                  Nasıl Çalışır?
                </Button>
              </Link>
            </div>
            
            {/* İstatistikler */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent">%0</div>
                <div className="text-sm text-gray-200">Faiz Oranı</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent">1000₺</div>
                <div className="text-sm text-gray-200">İşlem Ücreti</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent">12</div>
                <div className="text-sm text-gray-200">Ay Vade</div>
              </div>
            </div>
          </div>
          
          {/* Sağ Taraf - Görsel */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Kredi Puanınız</h3>
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                
                {/* Kredi Skoru Göstergesi */}
                <div className="relative">
                  <div className="w-full bg-gray-300 rounded-full h-4">
                    <div 
                      className={`bg-gradient-to-r ${getScoreColor(findeksScore)} h-4 rounded-full transition-all duration-500`} 
                      style={{width: `${getScorePercentage(findeksScore)}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>0</span>
                    <span className="font-semibold">{getScoreText(findeksScore)}</span>
                    <span>1900</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-accent" />
                      <span className="text-sm">Güvenli</span>
                    </div>
                    <div className="text-2xl font-bold mt-1">%100</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-accent" />
                      <span className="text-sm">Anlaşmalı</span>
                    </div>
                    <div className="text-2xl font-bold mt-1">5+</div>
                    <div className="text-xs text-gray-300">Banka</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-200 mb-3">
                    {findeksScore ? 'Skorunuzu daha da yükseltin' : 'Kredi geçmişi oluşturmaya başlayın'}
                  </p>
                  <Link to="/basvuru">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold">
                      Başvuru Yap
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-accent text-primary p-3 rounded-full shadow-lg">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-primary p-3 rounded-full shadow-lg">
              <Shield className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
