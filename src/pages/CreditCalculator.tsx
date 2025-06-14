
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";

interface PaymentPlan {
  taksitNo: number;
  taksitTutari: number;
  normalAnaparaTutari: number;
  araOdeme: number;
  toplamAnaparaTutari: number;
  netFaizTutari: number;
  kkdfTutari: number;
  bsmvTutari: number;
  brutFaizTutari: number;
  kalanAnapara: number;
  tvmDegeri: number;
}

interface CreditPlan {
  krediTutari: number;
  duzeltilmisKrediTutari: number;
  aylikNetFaizOrani: number;
  aylikBrutFaizOrani: number;
  taksitSayisi: number;
  taksitTutari: number;
  toplamOdeme: number;
  toplamNetFaiz: number;
  toplamKKDF: number;
  toplamBSMV: number;
  toplamVergiDahilFaiz: number;
  toplamAraOdeme: number;
  toplamAnapara: number;
  toplamIskontoTutari: number;
  odemePlani: PaymentPlan[];
  negativeAnaparaFound: boolean;
}

const CreditCalculator: React.FC = () => {
  const [krediTutari, setKrediTutari] = useState<number>(200000);
  const [aylikFaizOrani, setAylikFaizOrani] = useState<number>(3.00);
  const [taksitSayisi, setTaksitSayisi] = useState<number>(12);
  const [creditPlan, setCreditPlan] = useState<CreditPlan | null>(null);
  const [araOdemeler, setAraOdemeler] = useState<number[]>([]);

  // Tax rates
  const KKDF_ORANI = 0.15; // %15
  const BSMV_ORANI = 0.05; // %5

  // Present value calculation
  const bugunkuDegerHesapla = (gelecekDeger: number, aylikFaizOrani: number, donem: number): number => {
    return gelecekDeger / Math.pow(1 + aylikFaizOrani * (1 + KKDF_ORANI + BSMV_ORANI), donem);
  };

  // Monthly payment calculation
  const taksitTutariHesapla = (krediTutari: number, aylikNetFaizOrani: number, taksitSayisi: number): number => {
    const brutFaizOrani = aylikNetFaizOrani * (1 + KKDF_ORANI + BSMV_ORANI);
    return krediTutari * (brutFaizOrani * Math.pow(1 + brutFaizOrani, taksitSayisi)) / 
           (Math.pow(1 + brutFaizOrani, taksitSayisi) - 1);
  };

  // Create payment plan
  const odemePlaniOlustur = (krediTutari: number, aylikNetFaizOrani: number, taksitSayisi: number, araOdemeler: number[] = []): CreditPlan => {
    let toplamIskontoTutari = 0;
    let tvmDegerleri = new Array(taksitSayisi).fill(0);

    for (let i = 0; i < taksitSayisi; i++) {
      const araOdeme = araOdemeler[i] || 0;
      if (araOdeme > 0) {
        const iskontoTutari = bugunkuDegerHesapla(araOdeme, aylikNetFaizOrani, i + 1);
        tvmDegerleri[i] = iskontoTutari;
        toplamIskontoTutari += iskontoTutari;
      }
    }
    
    const dynamicRemainingInitial = Math.max(0, krediTutari - toplamIskontoTutari);
    const taksitTutari = taksitTutariHesapla(dynamicRemainingInitial, aylikNetFaizOrani, taksitSayisi);
    
    let displayRemaining = krediTutari;
    let dynamicRemaining = dynamicRemainingInitial;
    
    let toplamKKDF = 0;
    let toplamBSMV = 0;
    let toplamNetFaiz = 0;
    let toplamOdeme = 0;
    let toplamAraOdeme = 0;
    let toplamAnapara = 0;

    let negativeAnaparaFound = false;
    
    const odemePlani: PaymentPlan[] = [];
    
    // Initial row
    odemePlani.push({
      taksitNo: 0,
      taksitTutari: 0,
      normalAnaparaTutari: 0,
      araOdeme: 0,
      toplamAnaparaTutari: 0,
      netFaizTutari: 0,
      kkdfTutari: 0,
      bsmvTutari: 0,
      brutFaizTutari: 0,
      kalanAnapara: krediTutari,
      tvmDegeri: 0
    });
    
    for (let taksitNo = 1; taksitNo <= taksitSayisi; taksitNo++) {
      const netFaizTutari = displayRemaining * aylikNetFaizOrani;
      const kkdfTutari = netFaizTutari * KKDF_ORANI;
      const bsmvTutari = netFaizTutari * BSMV_ORANI;
      const brutFaizTutari = netFaizTutari + kkdfTutari + bsmvTutari;
      
      const normalAnaparaTutari = taksitTutari - brutFaizTutari;
      if (normalAnaparaTutari < 0) {
        negativeAnaparaFound = true;
      }
      
      const araOdeme = araOdemeler[taksitNo - 1] || 0;
      toplamAraOdeme += araOdeme;
      toplamAnapara += normalAnaparaTutari;
      
      displayRemaining -= normalAnaparaTutari;
      if (araOdeme > 0) {
        displayRemaining -= araOdeme;
      }
      
      dynamicRemaining -= normalAnaparaTutari;
      if (araOdeme > 0) {
        dynamicRemaining -= araOdeme;
      }
      
      toplamKKDF += kkdfTutari;
      toplamBSMV += bsmvTutari;
      toplamNetFaiz += netFaizTutari;
      toplamOdeme += taksitTutari + araOdeme;
      
      odemePlani.push({
        taksitNo: taksitNo,
        taksitTutari: taksitTutari,
        normalAnaparaTutari: normalAnaparaTutari,
        araOdeme: araOdeme,
        toplamAnaparaTutari: normalAnaparaTutari + araOdeme,
        netFaizTutari: netFaizTutari,
        kkdfTutari: kkdfTutari,
        bsmvTutari: bsmvTutari,
        brutFaizTutari: brutFaizTutari,
        kalanAnapara: displayRemaining < 0 ? 0 : displayRemaining,
        tvmDegeri: tvmDegerleri[taksitNo - 1]
      });
      
      if (dynamicRemaining <= 0) {
        break;
      }
    }
    
    return {
      krediTutari,
      duzeltilmisKrediTutari: dynamicRemainingInitial,
      aylikNetFaizOrani,
      aylikBrutFaizOrani: taksitTutariHesapla(dynamicRemainingInitial, aylikNetFaizOrani, taksitSayisi) * (1 + KKDF_ORANI + BSMV_ORANI),
      taksitSayisi,
      taksitTutari,
      toplamOdeme,
      toplamNetFaiz,
      toplamKKDF,
      toplamBSMV,
      toplamVergiDahilFaiz: (toplamNetFaiz + toplamKKDF + toplamBSMV),
      toplamAraOdeme,
      toplamAnapara,
      toplamIskontoTutari,
      odemePlani,
      negativeAnaparaFound
    };
  };

  const handleCalculate = () => {
    if (krediTutari <= 0 || aylikFaizOrani <= 0 || taksitSayisi <= 0) {
      alert("Lütfen tüm alanları pozitif değerler ile doldurun.");
      return;
    }
    
    const newAraOdemeler = new Array(taksitSayisi).fill(0);
    setAraOdemeler(newAraOdemeler);
    const plan = odemePlaniOlustur(krediTutari, aylikFaizOrani / 100, taksitSayisi, newAraOdemeler);
    
    if (plan.negativeAnaparaFound) {
      alert("Girilen ara ödeme tutarı çok yüksek. Daha düşük bir tutar girmeniz gerekiyor.");
      return;
    }

    setCreditPlan(plan);
  };

  const handleAraOdemeChange = (taksitNo: number, value: string) => {
    const araOdemeTutari = parseFloat(value) || 0;
    const newAraOdemeler = [...araOdemeler];
    newAraOdemeler[taksitNo - 1] = araOdemeTutari;
    
    const yeniPlan = odemePlaniOlustur(krediTutari, aylikFaizOrani / 100, taksitSayisi, newAraOdemeler);

    if (yeniPlan.negativeAnaparaFound) {
      alert("Girilen ara ödeme tutarı çok yüksek. Daha düşük bir tutar girmeniz gerekiyor.");
      return;
    }

    setAraOdemeler(newAraOdemeler);
    setCreditPlan(yeniPlan);
  };

  const formatNumber = (num: number): string => {
    return Math.round(num).toLocaleString('tr-TR');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Kredi Ödeme Planı Hesaplama
            </h1>
            
            {/* Top section with info and form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Info box */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  Ödeme planını oluşturmak için yandaki bilgileri girerek{' '}
                  <strong className="text-orange-600">"Ödeme Planını Hesapla"</strong>{' '}
                  düğmesine basın. Ödeme planı tablosu oluştuktan sonra her bir taksit için ayrıca ara ödeme tutarı girerek, 
                  kendi nakit akışınıza uygun olacak şekilde ödeme planını özelleştirebilirsiniz. Ara ödeme tutarı ekledikçe 
                  normal taksit tutarları düşecektir. Bu şekilde örneğin 3 ayda bir çift maaş alıyorsanız veya sadece belli 
                  bir dönemde elinize ek bir para geçecek ise, bunu ödeme planına ekleyerek diğer taksitleri daha rahat 
                  ödeyebilirsiniz.
                </p>
              </div>
              
              {/* Form section */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Kredi Tutarı (TL)
                    </label>
                    <input
                      type="number"
                      value={krediTutari}
                      onChange={(e) => setKrediTutari(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Kredi tutarını giriniz"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Aylık Net Faiz Oranı (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={aylikFaizOrani}
                      onChange={(e) => setAylikFaizOrani(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Aylık faiz oranını giriniz"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Taksit Sayısı (Ay)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={taksitSayisi}
                      onChange={(e) => setTaksitSayisi(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Taksit sayısını giriniz"
                    />
                  </div>
                  
                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg font-semibold"
                  >
                    Ödeme Planını Hesapla
                  </Button>
                </div>
              </div>
            </div>

            {/* Results section */}
            {creditPlan && (
              <div className="space-y-8">
                {/* Summary */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Kredi Özeti</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="font-semibold text-gray-700 mb-2">Kredi Tutarı</div>
                      <div className="text-lg font-medium">{formatNumber(creditPlan.krediTutari)} ₺</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="font-semibold text-gray-700 mb-2">Aylık Net Faiz</div>
                      <div className="text-lg font-medium">%{(creditPlan.aylikNetFaizOrani * 100).toFixed(2)}</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="font-semibold text-gray-700 mb-2">Taksit Sayısı</div>
                      <div className="text-lg font-medium">{creditPlan.taksitSayisi} ay</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="font-semibold text-gray-700 mb-2">Aylık Taksit Tutarı</div>
                      <div className="text-lg font-medium">{formatNumber(creditPlan.taksitTutari)} ₺</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="font-semibold text-gray-700 mb-2">Toplam Geri Ödeme</div>
                      <div className="text-lg font-medium">{formatNumber(creditPlan.toplamOdeme)} ₺</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="font-semibold text-gray-700 mb-2">Toplam Net Faiz</div>
                      <div className="text-lg font-medium">{formatNumber(creditPlan.toplamNetFaiz)} ₺</div>
                    </div>
                  </div>
                </div>

                {/* Payment table */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Aylık Ödeme Planı</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                      <thead className="bg-yellow-400">
                        <tr>
                          <th className="px-4 py-3 text-center font-bold border border-gray-300">Taksit No</th>
                          <th className="px-4 py-3 text-center font-bold border border-gray-300">Taksit Tutarı</th>
                          <th className="px-4 py-3 text-center font-bold border border-gray-300">Faiz</th>
                          <th className="px-4 py-3 text-center font-bold border border-gray-300">KKDF</th>
                          <th className="px-4 py-3 text-center font-bold border border-gray-300">BSMV</th>
                          <th className="px-4 py-3 text-center font-bold border border-gray-300">Ana Para</th>
                          <th className="px-4 py-3 text-center font-bold border border-gray-300">Kalan Ana Para</th>
                          <th className="px-4 py-3 text-center font-bold border border-gray-300">Ara Ödeme (İsteğe Bağlı)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {creditPlan.odemePlani.map((taksit, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            {index === 0 ? (
                              <>
                                <td className="px-4 py-3 text-center border border-gray-300"></td>
                                <td className="px-4 py-3 text-right border border-gray-300"></td>
                                <td className="px-4 py-3 text-right border border-gray-300"></td>
                                <td className="px-4 py-3 text-right border border-gray-300"></td>
                                <td className="px-4 py-3 text-right border border-gray-300"></td>
                                <td className="px-4 py-3 text-right border border-gray-300"></td>
                                <td className="px-4 py-3 text-center text-xl font-bold border border-gray-300">
                                  {formatNumber(taksit.kalanAnapara)}
                                </td>
                                <td className="px-4 py-3 text-center border border-gray-300"></td>
                              </>
                            ) : (
                              <>
                                <td className="px-4 py-3 text-center border border-gray-300">{taksit.taksitNo}</td>
                                <td className="px-4 py-3 text-right border border-gray-300">
                                  {formatNumber(taksit.araOdeme > 0 ? taksit.taksitTutari + taksit.araOdeme : taksit.taksitTutari)}
                                </td>
                                <td className="px-4 py-3 text-right border border-gray-300">{formatNumber(taksit.netFaizTutari)}</td>
                                <td className="px-4 py-3 text-right border border-gray-300">{formatNumber(taksit.kkdfTutari)}</td>
                                <td className="px-4 py-3 text-right border border-gray-300">{formatNumber(taksit.bsmvTutari)}</td>
                                <td className="px-4 py-3 text-right border border-gray-300">{formatNumber(taksit.normalAnaparaTutari)}</td>
                                <td className="px-4 py-3 text-right border border-gray-300">{formatNumber(taksit.kalanAnapara)}</td>
                                <td className="px-4 py-3 text-center border border-gray-300">
                                  <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={Math.round(taksit.araOdeme)}
                                    onChange={(e) => handleAraOdemeChange(taksit.taksitNo, e.target.value)}
                                    onFocus={(e) => {
                                      if (e.target.value === '0') e.target.value = '';
                                    }}
                                    onBlur={(e) => {
                                      if (e.target.value === '') e.target.value = '0';
                                    }}
                                    className="w-32 px-2 py-1 text-right border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreditCalculator;
