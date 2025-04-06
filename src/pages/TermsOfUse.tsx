
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfUse: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-16 bg-gray-50">
        <section className="px-6 py-10 md:px-12 lg:px-24 max-w-5xl mx-auto text-gray-700 leading-relaxed font-sans">
          <h2 className="text-3xl font-bold mb-6">Kullanım Koşulları</h2>

          <h3 className="text-xl font-semibold mt-6 mb-2">1. Taraflar ve Kapsam</h3>
          <p>
            Bu kullanım koşulları; Nora Finansal Yazılımlar Anonim Şirketi ("NORA A.Ş.") tarafından geliştirilen ve işletilen
            <strong> SkorUp </strong> platformunun kullanıcılar tarafından kullanımına ilişkin hükümleri düzenler.
            Platformu kullanan tüm gerçek kişiler ("Kullanıcı") bu koşulları okumuş, anlamış ve kabul etmiş sayılır.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">2. Hizmetin Tanımı</h3>
          <p>
            SkorUp, kredi geçmişi olmayan veya kredi skoru düşük bireylerin, dijital başvuru yoluyla banka üzerinden %100 nakit teminatlı ve faizsiz bir kredi
            kullanarak kredi skoru oluşturmasını hedefleyen bir platformdur. Platform, doğrudan kredi vermez; kullanıcıları anlaşmalı bankalara yönlendirir ve kredi sürecinin başlatılmasına aracılık eder.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">3. Kullanım Şartları</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Kullanıcı, başvuru formlarını doğru ve eksiksiz bilgilerle doldurmayı taahhüt eder.</li>
            <li>Sisteme kayıt olan kullanıcı, verdiği bilgilerin kendisine ait ve güncel olduğunu beyan eder.</li>
            <li>Kredi başvurusuna ilişkin süreçler, ilgili banka ve kullanıcı arasında gerçekleşir.</li>
            <li>Platform yalnızca bireysel kullanım içindir. Ticari veya hileli kullanım yasaktır.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">4. Sorumluluk Sınırlamaları</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>SkorUp, kredi başvurularının onaylanmasını garanti etmez.</li>
            <li>Platform, kredi kararı veya puan artışı konusunda sonuç taahhüdü vermez.</li>
            <li>Bankalar ile kullanıcı arasında doğabilecek anlaşmazlıklardan NORA A.Ş. sorumlu tutulamaz.</li>
            <li>Teknik aksaklıklar nedeniyle oluşabilecek veri kayıplarından sorumluluk kabul edilmez.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">5. Fikri Mülkiyet Hakları</h3>
          <p>
            Platform ve içerisindeki tüm içerik, görseller, yazılımlar ve dokümanlar NORA A.Ş.'nin mülkiyetindedir. İzinsiz çoğaltılamaz, dağıtılamaz veya kopyalanamaz.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">6. Kişisel Verilerin Korunması</h3>
          <p>
            Kullanıcıların kişisel verileri, 6698 sayılı KVKK kapsamında ve yalnızca hizmet amaçlı işlenir.
            Detaylı bilgi için KVKK Aydınlatma Metni sayfasını ziyaret edebilirsiniz.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">7. Sözleşmenin Güncellenmesi</h3>
          <p>
            NORA A.Ş., kullanım koşullarını güncelleme hakkını saklı tutar. Yayın tarihi itibarıyla güncel koşullar geçerli olur ve kullanıcı tarafından platformun kullanılmaya devam edilmesi bu değişikliklerin kabul edildiği anlamına gelir.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">8. Uyuşmazlıkların Çözümü</h3>
          <p>
            Bu koşullar Türk Hukuku'na tabidir. Uyuşmazlık durumunda İstanbul Merkez (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">9. İletişim</h3>
          <p>
            Tüm sorular için: <a href="mailto:info@skorup.org" className="text-blue-600 underline">info@skorup.org</a>
          </p>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfUse;
