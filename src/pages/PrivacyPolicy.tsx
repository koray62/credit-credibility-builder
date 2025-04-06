
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-16 bg-gray-50">
        <section className="px-6 py-10 md:px-12 lg:px-24 max-w-5xl mx-auto text-gray-700 leading-relaxed font-sans">
          <h2 className="text-3xl font-bold mb-6">Gizlilik Politikası</h2>

          <h3 className="text-xl font-semibold mt-6 mb-2">1. Giriş</h3>
          <p>
            Nora Finansal Yazılımlar Anonim Şirketi ("NORA A.Ş.") olarak, kişisel verilerinizin gizliliğine ve güvenliğine büyük önem veriyoruz.
            SkorUp platformunu kullandığınızda bize sağladığınız kişisel veriler, bu Gizlilik Politikası doğrultusunda korunmakta ve işlenmektedir.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">2. Toplanan Veriler</h3>
          <p>Platforma başvurunuz sırasında veya sistem içerisindeki işlemleriniz esnasında aşağıdaki veriler toplanabilir:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Kimlik bilgileri (Ad, soyad, T.C. kimlik no)</li>
            <li>İletişim bilgileri (Telefon, e-posta, adres)</li>
            <li>Demografik veriler (Doğum tarihi, cinsiyet, eğitim düzeyi, meslek vb.)</li>
            <li>Cihaz ve bağlantı bilgileri (IP adresi, tarayıcı türü, oturum süresi, erişim zamanı)</li>
            <li>Kredi başvuru bilgileri</li>
            <li>Kullanıcının açık rızasıyla paylaşılan Findeks raporu ve kredi skoru bilgileri</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">3. Verilerin Toplanma Yöntemleri</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Web sitesinde yer alan başvuru ve iletişim formları</li>
            <li>Çerezler aracılığıyla pasif veri toplama</li>
            <li>Mobil cihazlar ve tarayıcılar üzerinden otomatik kayıtlar</li>
            <li>KVKK'ya uygun şekilde açık rıza alınarak entegre edilen Findeks ve banka sistemleri üzerinden</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">4. Verilerin Kullanım Amaçları</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Başvuruların alınması, değerlendirilmesi ve yönlendirilmesi</li>
            <li>Kredi puanı oluşturma sürecinin yürütülmesi</li>
            <li>Kullanıcı bilgilendirme ve destek süreçlerinin sağlanması</li>
            <li>Finansal okuryazarlık kapsamında içerik sunulması</li>
            <li>Sistem güvenliğinin sağlanması, kötüye kullanımın önlenmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">5. Verilerin Saklama Süresi</h3>
          <p>
            Kişisel verileriniz, ilgili mevzuat çerçevesinde gerekli olan süre boyunca saklanır.
            Saklama süresi sona erdiğinde verileriniz KVKK'ya uygun şekilde anonimleştirilir veya silinir.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">6. Üçüncü Taraflarla Paylaşım</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>5411 sayılı Bankacılık Kanunu kapsamında faaliyet gösteren anlaşmalı bankalar</li>
            <li>Teknoloji altyapısını sağlayan iş ortakları</li>
            <li>Resmi kurum ve kuruluşlar (kanunen zorunlu hallerde)</li>
          </ul>
          <p>
            Veriler bu taraflara yalnızca belirtilen amaçlarla, açık rıza alınarak veya yasal yükümlülük dahilinde aktarılır.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">7. Çerezler (Cookies)</h3>
          <p>
            SkorUp web sitesi, kullanıcı deneyimini geliştirmek için çerezlerden yararlanır. Çerezler; ziyaret trafiğini analiz etmek,
            kullanıcı davranışlarını anlamak ve tercihlere göre içerik sunmak amacıyla kullanılır.
            Tarayıcınızdan çerez tercihlerinizi değiştirebilir veya çerezleri devre dışı bırakabilirsiniz.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">8. Güvenlik</h3>
          <p>
            Kişisel veriler, endüstri standartlarına uygun şifreleme ve erişim kontrol önlemleri ile korunur.
            Tüm veri iletimi SSL üzerinden güvenli şekilde yapılır. Erişim logları tutulur ve sadece yetkili kişiler tarafından erişim sağlanır.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">9. Haklarınız</h3>
          <p>
            KVKK'nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, verilerinize erişim ve düzeltme isteme, işlenme amaçlarını öğrenme,
            aktarıldığı tarafları bilme, silinmesini veya yok edilmesini talep etme haklarına sahipsiniz.
            Taleplerinizi <a href="mailto:kvkk@norafinans.com" className="text-blue-600 underline">kvkk@norafinans.com</a> adresine iletebilirsiniz.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">10. Güncellemeler</h3>
          <p>
            Bu Gizlilik Politikası zaman zaman güncellenebilir. Güncel metin her zaman SkorUp web sitesinde yayınlanır.
            Kullanıcılar bu değişikliklerden haberdar olmakla yükümlüdür.
          </p>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
