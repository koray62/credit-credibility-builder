
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

// Create a separate component for the KVKK content that can be reused
export const KVKKContent: React.FC = () => {
  return (
    <>
      <p className="text-sm text-gray-600">
        6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, üyelik ve kredi başvuru sürecinde tarafımıza ilettiğiniz kişisel verilerinizin işlenmesine ilişkin olarak aşağıdaki bilgilendirme yapılmaktadır.
      </p>

      <div className="space-y-2">
        <h3 className="font-semibold text-base">1. Veri Sorumlusu</h3>
        <p className="text-sm text-gray-600">
          Kişisel verileriniz, veri sorumlusu sıfatıyla <strong>Nora Finansal Yazılımlar Anonim Şirketi (NORA A.Ş.)</strong> tarafından aşağıda açıklanan çerçevede işlenmektedir.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-base">2. İşlenen Veriler</h3>
        <p className="text-sm text-gray-600">
          Ad, soyad, T.C. kimlik numarası, iletişim bilgileri, demografik bilgiler, eğitim ve meslek bilgileri, kredi başvuru detayları, Findeks raporu (rızanızla), IP adresi, işlem tarihi ve işlem logları.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-base">3. İşleme Amaçları</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>Kredi başvurusunun alınması, değerlendirilmesi ve anlaşmalı finansal kuruluşa yönlendirilmesi</li>
          <li>Krediye ilişkin ön değerlendirme ve uygunluk analizlerinin yapılması ve bu amaçla dijital sistemlerin geliştirilmesi ve işletilmesi</li>
          <li>Kredi geçmişi oluşturulması ve finansal davranış takibi</li>
          <li>Başvuru sahibinin bilgilendirilmesi ve müşteri destek süreçlerinin yürütülmesi</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          <li>Finansal okuryazarlık kapsamında bilgilendirme yapılması</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-base">4. Hukuki Sebepler</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>KVKK m.5/2(c): Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması</li>
          <li>KVKK m.5/2(f): Veri sorumlusunun meşru menfaatleri için işlenmesinin zorunlu olması</li>
          <li>KVKK m.5/1: Açık rıza alınması hâlinde</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-base">5. Kişisel Verilerin Aktarılması</h3>
        <p className="text-sm text-gray-600">
          Kişisel verileriniz;
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>5411 sayılı Bankacılık Kanunu kapsamındaki bankalar ve finansal kuruluşlara,</li>
          <li>Veri işleme ve teknik altyapı hizmeti sağlayan, KVKK ile uyumlu iş ortaklarına,</li>
          <li>Yasal yükümlülük kapsamında ilgili kurumlara</li>
        </ul>
        <p className="text-sm text-gray-600">
          yalnızca ilgili amaçlar doğrultusunda ve KVKK'ya uygun şekilde aktarılabilir.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-base">6. Veri Sahibi Olarak Haklarınız</h3>
        <p className="text-sm text-gray-600">
          KVKK m.11 kapsamında;
          Kişisel verinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,
          eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme, verilerin silinmesini veya yok edilmesini isteme, bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme, işlenen verilerin münhasıran otomatik sistemler 
          vasıtasıyla analiz edilmesi sonucu aleyhe çıkan bir sonuca itiraz etme, kanuna aykırı olarak işlenmiş verilerin zarara yol açması hâlinde zararının giderilmesini talep etme haklarına sahipsiniz.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-base">7. Başvuru</h3>
        <p className="text-sm text-gray-600">
          Tüm taleplerinizi <a href="mailto:info@skorup.gov" className="text-primary hover:underline">info@skorup.gov</a> adresine e-posta ile veya şirket merkezimize yazılı olarak iletebilirsiniz.
        </p>
      </div>
    </>
  );
};

const KVKK: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
            <Button 
              variant="outline" 
              className="mb-6" 
              onClick={() => navigate(-1)}
            >
              Geri Dön
            </Button>
            
            <section id="kvkk-aydinlatma" className="space-y-6">
              <h1 className="text-3xl font-bold">Kişisel Verilerin Korunması Aydınlatma Metni</h1>
              <KVKKContent />
            </section>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <Button 
                onClick={() => navigate(-1)} 
                className="w-full md:w-auto bg-primary text-white"
              >
                Anladım, Geri Dön
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default KVKK;
