
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const CreditCalculation: React.FC = () => {
  const [krediTutari, setKrediTutari] = useState<number>(200000);
  const [aylikFaizOrani, setAylikFaizOrani] = useState<number>(3.00);
  const [taksitSayisi, setTaksitSayisi] = useState<number>(12);
  const [araOdemeler, setAraOdemeler] = useState<number[]>([]);
  const [globalOdemePlani, setGlobalOdemePlani] = useState<CreditPlan | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Vergi oranları
  const KKDF_ORANI = 0.15; // %15
  const BSMV_ORANI = 0.05; // %5

  // Bugünkü Değer Hesaplama (İskonto)
  const bugunkuDegerHesapla = (gelecekDeger: number, aylikFaizOrani: number, donem: number): number => {
    return gelecekDeger / Math.pow(1 + aylikFaizOrani * (1 + KKDF_ORANI + BSMV_ORANI), donem);
  };

  // Taksit Tutarı (Anüite) Hesaplama
  const taksitTutariHesapla = (krediTutari: number, aylikNetFaizOrani: number, taksitSayisi: number): number => {
    const brutFaizOrani = aylikNetFaizOrani * (1 + KKDF_ORANI + BSMV_ORANI);
    return krediTutari * (brutFaizOrani * Math.pow(1 + brutFaizOrani, taksitSayisi)) / 
           (Math.pow(1 + brutFaizOrani, taksitSayisi) - 1);
  };

  // Kredi Ödeme Planı Hesaplama
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
    // 0. satır: kredi başlangıcı
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

  const odemePlaniTablosuOlustur = () => {
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

    setGlobalOdemePlani(plan);
    setShowResults(true);
  };

  const araOdemeGuncelle = (taksitNo: number, yeniDeger: string) => {
    const araOdemeTutari = parseFloat(yeniDeger) || 0;
    const newAraOdemeler = [...araOdemeler];
    newAraOdemeler[taksitNo - 1] = araOdemeTutari;
    
    const yeniPlan = odemePlaniOlustur(krediTutari, aylikFaizOrani / 100, taksitSayisi, newAraOdemeler);

    if (yeniPlan.negativeAnaparaFound) {
      alert("Girilen ara ödeme tutarı çok yüksek. Daha düşük bir tutar girmeniz gerekiyor.");
      return;
    }

    setAraOdemeler(newAraOdemeler);
    setGlobalOdemePlani(yeniPlan);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", lineHeight: 1.6, margin: 0, padding: 0, color: '#333', backgroundColor: '#f9f9f9' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '30px auto', backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '30px', fontSize: '32px', fontWeight: 600 }}>
          Kredi Ödeme Planı Hesaplama
        </h1>
        
        {/* Üst bölüm: Yan yana info kutusu ve form */}
        <div 
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} 
          className="responsive-grid"
        >
          {/* Bilgi Kutusu */}
          <div style={{ backgroundColor: '#fff9db', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #ffd43b', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', fontSize: '15px', lineHeight: 1.6 }}>
            <p style={{ margin: 0 }}>
              Ödeme planını oluşturmak için yandaki bilgileri girerek <strong style={{ color: '#e67e22', fontWeight: 600, display: 'inline', marginRight: '5px', fontSize: '17px' }}>"Ödeme Planını Hesapla"</strong> düğmesine basın. Ödeme planı tablosu oluştuktan sonra her bir taksit için ayrıca ara ödeme tutarı girerek, kendi nakit akışınıza uygun olacak şekilde ödeme planını özelleştirebilirsiniz. Ara ödeme tutarı ekledikçe normal taksit tutarları düşecektir. Bu şekilde örneğin 3 ayda bir çift maaş alıyorsanız veya sadece belli bir dönemde elinize ek bir para geçecek ise, bunu ödeme planına ekleyerek diğer taksitleri daha rahat ödeyebilirsiniz. Dilerseniz son takside yüklü bir miktar ara ödeme yazarak (balon ödeme), daha da küçük aylık taksitler elde edebilirsiniz. Bu yöntem özellikle taşıt kredilerinde kullanılan bir yöntemdir. Vade sonunda aracın satılarak kredinin kapatılması durumunda kullanılır.
            </p>
          </div>
          
          {/* Parametrelerin Girildiği Form */}
          <div style={{ backgroundColor: '#f8f8f8', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px' }}>
            <div style={{ marginBottom: '25px' }}>
              <label htmlFor="krediTutari" style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#34495e', fontSize: '15px' }}>
                Kredi Tutarı (TL)
              </label>
              <input
                type="number"
                id="krediTutari"
                value={krediTutari}
                onChange={(e) => setKrediTutari(Number(e.target.value))}
                style={{ width: '100%', padding: '12px 15px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box', fontSize: '16px', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                placeholder="Kredi tutarını giriniz"
              />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label htmlFor="aylikFaizOrani" style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#34495e', fontSize: '15px' }}>
                Aylık Net Faiz Oranı (%)
              </label>
              <input
                type="number"
                id="aylikFaizOrani"
                value={aylikFaizOrani}
                onChange={(e) => setAylikFaizOrani(Number(e.target.value))}
                step="0.01"
                min="0"
                max="10"
                style={{ width: '100%', padding: '12px 15px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box', fontSize: '16px', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                placeholder="Aylık faiz oranını giriniz"
              />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label htmlFor="taksitSayisi" style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#34495e', fontSize: '15px' }}>
                Taksit Sayısı (Ay)
              </label>
              <input
                type="number"
                id="taksitSayisi"
                value={taksitSayisi}
                onChange={(e) => setTaksitSayisi(Number(e.target.value))}
                min="1"
                max="120"
                style={{ width: '100%', padding: '12px 15px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box', fontSize: '16px', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                placeholder="Taksit sayısını giriniz"
              />
            </div>
            <button
              onClick={odemePlaniTablosuOlustur}
              style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '14px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '18px', fontWeight: 600, display: 'block', margin: '30px auto', width: '100%', maxWidth: '300px', transition: 'background-color 0.3s' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
            >
              Ödeme Planını Hesapla
            </button>
          </div>
        </div>

        {/* Sonuçlar Bölümü */}
        {showResults && globalOdemePlani && (
          <div style={{ marginTop: '30px' }}>
            <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#eaf7ff', borderRadius: '4px' }}>
              <h2>Kredi Özeti</h2>
              <div 
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '30px' }} 
                className="ozet-responsive"
              >
                <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'block', color: '#2c3e50', marginBottom: '6px', fontSize: '15px', fontWeight: 'bold' }}>Kredi Tutarı</div>
                  <div style={{ fontSize: '17px', fontWeight: 500, color: '#333' }}>{Math.round(globalOdemePlani.krediTutari).toLocaleString('tr-TR')} ₺</div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'block', color: '#2c3e50', marginBottom: '6px', fontSize: '15px', fontWeight: 'bold' }}>Aylık Net Faiz</div>
                  <div style={{ fontSize: '17px', fontWeight: 500, color: '#333' }}>%{(globalOdemePlani.aylikNetFaizOrani * 100).toFixed(2)}</div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'block', color: '#2c3e50', marginBottom: '6px', fontSize: '15px', fontWeight: 'bold' }}>Brüt Faiz (KKDF+BSMV)</div>
                  <div style={{ fontSize: '17px', fontWeight: 500, color: '#333' }}>%{(globalOdemePlani.aylikBrutFaizOrani * 100).toFixed(2)}</div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'block', color: '#2c3e50', marginBottom: '6px', fontSize: '15px', fontWeight: 'bold' }}>Taksit Sayısı</div>
                  <div style={{ fontSize: '17px', fontWeight: 500, color: '#333' }}>{globalOdemePlani.taksitSayisi} ay</div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'block', color: '#2c3e50', marginBottom: '6px', fontSize: '15px', fontWeight: 'bold' }}>Aylık Taksit Tutarı</div>
                  <div style={{ fontSize: '17px', fontWeight: 500, color: '#333' }}>{Math.round(globalOdemePlani.taksitTutari).toLocaleString('tr-TR')} ₺</div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'block', color: '#2c3e50', marginBottom: '6px', fontSize: '15px', fontWeight: 'bold' }}>Toplam Ara Ödeme</div>
                  <div style={{ fontSize: '17px', fontWeight: 500, color: '#333' }}>{Math.round(globalOdemePlani.toplamAraOdeme).toLocaleString('tr-TR')} ₺</div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'block', color: '#2c3e50', marginBottom: '6px', fontSize: '15px', fontWeight: 'bold' }}>Toplam Anapara</div>
                  <div style={{ fontSize: '17px', fontWeight: 500, color: '#333' }}>{Math.round(globalOdemePlani.toplamAnapara).toLocaleString('tr-TR')} ₺</div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'block', color: '#2c3e50', marginBottom: '6px', fontSize: '15px', fontWeight: 'bold' }}>Toplam Geri Ödeme</div>
                  <div style={{ fontSize: '17px', fontWeight: 500, color: '#333' }}>{Math.round(globalOdemePlani.toplamOdeme).toLocaleString('tr-TR')} ₺</div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'block', color: '#2c3e50', marginBottom: '6px', fontSize: '15px', fontWeight: 'bold' }}>Toplam Net Faiz</div>
                  <div style={{ fontSize: '17px', fontWeight: 500, color: '#333' }}>{Math.round(globalOdemePlani.toplamNetFaiz).toLocaleString('tr-TR')} ₺</div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'block', color: '#2c3e50', marginBottom: '6px', fontSize: '15px', fontWeight: 'bold' }}>Toplam KKDF (%15)</div>
                  <div style={{ fontSize: '17px', fontWeight: 500, color: '#333' }}>{Math.round(globalOdemePlani.toplamKKDF).toLocaleString('tr-TR')} ₺</div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'block', color: '#2c3e50', marginBottom: '6px', fontSize: '15px', fontWeight: 'bold' }}>Toplam BSMV (%5)</div>
                  <div style={{ fontSize: '17px', fontWeight: 500, color: '#333' }}>{Math.round(globalOdemePlani.toplamBSMV).toLocaleString('tr-TR')} ₺</div>
                </div>
                <div style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#f9f9f9', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'block', color: '#2c3e50', marginBottom: '6px', fontSize: '15px', fontWeight: 'bold' }}>Toplam Vergili Faiz</div>
                  <div style={{ fontSize: '17px', fontWeight: 500, color: '#333' }}>{Math.round(globalOdemePlani.toplamVergiDahilFaiz).toLocaleString('tr-TR')} ₺</div>
                </div>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <h2>Aylık Ödeme Planı</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0', fontSize: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '15px 12px', textAlign: 'center', border: '1px solid #ddd', backgroundColor: '#ffd700', color: '#000', fontWeight: 'bold', fontSize: '18px' }}>Taksit No</th>
                    <th style={{ padding: '15px 12px', textAlign: 'center', border: '1px solid #ddd', backgroundColor: '#ffd700', color: '#000', fontWeight: 'bold', fontSize: '18px' }}>Taksit Tutarı</th>
                    <th style={{ padding: '15px 12px', textAlign: 'center', border: '1px solid #ddd', backgroundColor: '#ffd700', color: '#000', fontWeight: 'bold', fontSize: '18px' }}>Faiz</th>
                    <th style={{ padding: '15px 12px', textAlign: 'center', border: '1px solid #ddd', backgroundColor: '#ffd700', color: '#000', fontWeight: 'bold', fontSize: '18px' }}>KKDF</th>
                    <th style={{ padding: '15px 12px', textAlign: 'center', border: '1px solid #ddd', backgroundColor: '#ffd700', color: '#000', fontWeight: 'bold', fontSize: '18px' }}>BSMV</th>
                    <th style={{ padding: '15px 12px', textAlign: 'center', border: '1px solid #ddd', backgroundColor: '#ffd700', color: '#000', fontWeight: 'bold', fontSize: '18px' }}>Ana Para</th>
                    <th style={{ padding: '15px 12px', textAlign: 'center', border: '1px solid #ddd', backgroundColor: '#ffd700', color: '#000', fontWeight: 'bold', fontSize: '18px' }}>Kalan Ana Para</th>
                    <th style={{ padding: '15px 12px', textAlign: 'center', border: '1px solid #ddd', backgroundColor: '#ffd700', color: '#000', fontWeight: 'bold', fontSize: '18px' }}>Ara Ödeme (İsteğe Bağlı)</th>
                  </tr>
                </thead>
                <tbody>
                  {globalOdemePlani.odemePlani.map((taksit, index) => (
                    <tr key={index} style={index === 0 ? { backgroundColor: 'white' } : index % 2 === 0 ? { backgroundColor: '#f9f9f9' } : { backgroundColor: '#ffffff' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f7ff'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = index === 0 ? 'white' : index % 2 === 0 ? '#f9f9f9' : '#ffffff'}>
                      <td style={{ padding: '15px 12px', textAlign: 'center', border: '1px solid #ddd', fontSize: '17px', fontWeight: 500 }}>
                        {index === 0 ? '' : taksit.taksitNo}
                      </td>
                      <td style={{ padding: '15px 12px', textAlign: 'right', border: '1px solid #ddd', fontSize: '17px', fontWeight: 500 }}>
                        {index === 0 ? '' : Math.round(taksit.araOdeme > 0 ? taksit.taksitTutari + taksit.araOdeme : taksit.taksitTutari).toLocaleString('tr-TR')}
                      </td>
                      <td style={{ padding: '15px 12px', textAlign: 'right', border: '1px solid #ddd', fontSize: '17px', fontWeight: 500 }}>
                        {index === 0 ? '' : Math.round(taksit.netFaizTutari).toLocaleString('tr-TR')}
                      </td>
                      <td style={{ padding: '15px 12px', textAlign: 'right', border: '1px solid #ddd', fontSize: '17px', fontWeight: 500 }}>
                        {index === 0 ? '' : Math.round(taksit.kkdfTutari).toLocaleString('tr-TR')}
                      </td>
                      <td style={{ padding: '15px 12px', textAlign: 'right', border: '1px solid #ddd', fontSize: '17px', fontWeight: 500 }}>
                        {index === 0 ? '' : Math.round(taksit.bsmvTutari).toLocaleString('tr-TR')}
                      </td>
                      <td style={{ padding: '15px 12px', textAlign: 'right', border: '1px solid #ddd', fontSize: '17px', fontWeight: 500 }}>
                        {index === 0 ? '' : Math.round(taksit.normalAnaparaTutari).toLocaleString('tr-TR')}
                      </td>
                      <td style={{ padding: '15px 12px', textAlign: 'right', border: '1px solid #ddd', fontSize: '20px', fontWeight: 'bold' }}>
                        {Math.round(taksit.kalanAnapara).toLocaleString('tr-TR')}
                      </td>
                      <td style={{ padding: '15px 12px', textAlign: 'center', border: '1px solid #ddd' }}>
                        {index === 0 ? '' : (
                          <input
                            type="number"
                            value={Math.round(taksit.araOdeme)}
                            onChange={(e) => araOdemeGuncelle(taksit.taksitNo, e.target.value)}
                            min="0"
                            step="1"
                            style={{ width: '130px', textAlign: 'right', padding: '8px', fontSize: '16px', fontWeight: 500, border: '1px solid #ddd', borderRadius: '4px' }}
                            onFocus={(e) => e.target.value === '0' ? e.target.value = '' : null}
                            onBlur={(e) => e.target.value === '' ? e.target.value = '0' : null}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      <style>
        {`
          @media (max-width: 900px) {
            .responsive-grid {
              grid-template-columns: 1fr !important;
            }
            .ozet-responsive {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 600px) {
            .ozet-responsive {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
      
      <Footer />
    </div>
  );
};

export default CreditCalculation;
