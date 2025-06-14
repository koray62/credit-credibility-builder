
export const krediHesaplamaPost = {
  slug: "kredi-hesaplama-nasil-yapilir",
  title: "Kredi Hesaplama Nasıl Yapılır? Detaylı Rehber",
  excerpt: "Kredi ödeme planınızı hesaplamak için bilmeniz gereken her şey. Faiz oranları, KKDF, BSMV ve ara ödemeler ile ilgili detaylı bilgiler.",
  content: `
    <div class="prose prose-lg max-w-none">
      <p class="lead text-xl text-gray-700 mb-8">Kredi almayı düşünürken en önemli konulardan biri, kredi ödeme planınızı doğru şekilde hesaplayabilmektir. Bu yazıda, kredi hesaplama yöntemlerini ve dikkat etmeniz gereken noktaları detaylı olarak açıklayacağız.</p>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
        <h3 class="text-lg font-semibold mb-3 text-blue-800">📊 İnteraktif Kredi Hesaplama Aracı</h3>
        <p class="text-blue-700 mb-4">Kendi kredi hesaplamalarınızı yapmak için interaktif hesaplama aracımızı kullanabilirsiniz. Bu araç ile faiz oranları, ara ödemeler ve farklı vade seçeneklerini test edebilirsiniz.</p>
        <button 
          id="kredi-hesaplama-btn" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center"
          onclick="window.open('/kredi-hesaplama', '_blank')"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
          Kredi Hesaplama Aracını Başlat
        </button>
      </div>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900">📋 Kredi Hesaplamasında Temel Kavramlar</h2>
      
      <div class="grid md:grid-cols-2 gap-6 my-8">
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-semibold mb-3 text-primary">💰 Ana Para (Anapara)</h3>
          <p class="text-gray-700">Bankadan aldığınız kredinin asıl tutarıdır. Bu tutar üzerinden faiz hesaplanır ve her taksitte anapara tutarının bir kısmını ödersiniz.</p>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-semibold mb-3 text-primary">📈 Faiz Oranı</h3>
          <p class="text-gray-700">Krediye uygulanan aylık faiz oranıdır. Genellikle yıllık olarak belirtilen faiz oranının 12'ye bölünmesiyle aylık faiz oranı bulunur.</p>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-semibold mb-3 text-primary">🏦 KKDF (Kaynak Kullanımını Destekleme Fonu)</h3>
          <p class="text-gray-700">Bankaların kredi faizleri üzerinden aldığı %15 oranındaki vergidir. Bu vergi, net faiz tutarı üzerinden hesaplanır.</p>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-semibold mb-3 text-primary">📊 BSMV (Banka ve Sigorta Muameleleri Vergisi)</h3>
          <p class="text-gray-700">Bankaların kredi faizleri üzerinden aldığı %5 oranındaki vergidir. Bu da net faiz tutarı üzerinden hesaplanır.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900">🧮 Kredi Hesaplama Yöntemleri</h2>

      <div class="space-y-8">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-4 text-blue-800">📈 Anüite (Eşit Taksit) Yöntemi</h3>
          <p class="text-gray-700 mb-4">En yaygın kullanılan kredi hesaplama yöntemidir. Bu yöntemde her ay sabit bir taksit tutarı ödersiniz.</p>
          
          <div class="bg-white border border-blue-200 rounded-lg p-4 my-4">
            <p class="font-mono text-sm text-gray-800 font-medium">
              <strong>Taksit Tutarı = Ana Para × (Brüt Faiz Oranı × (1 + Brüt Faiz Oranı)^Taksit Sayısı) / ((1 + Brüt Faiz Oranı)^Taksit Sayısı - 1)</strong>
            </p>
          </div>
        </div>

        <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-4 text-green-800">📉 Azalan Bakiye Yöntemi</h3>
          <p class="text-gray-700">Bu yöntemde anapara tutarı her taksitte eşit olarak azalır, ancak faiz tutarı kalan bakiye üzerinden hesaplandığı için taksit tutarları zaman içinde azalır.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900">💡 Ara Ödeme Stratejileri</h2>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Ara Ödeme Nedir?</h3>
        <p class="text-gray-700 mb-4">Ara ödeme, normal taksit ödemelerinize ek olarak yaptığınız ekstra ödemelerdir. Bu ödemeler doğrudan anapara tutarından düşülür ve toplam faiz maliyetinizi azaltır.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-6 my-8">
        <div class="text-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <h4 class="font-semibold text-gray-900 mb-2">Faiz Tasarrufu</h4>
          <p class="text-gray-600 text-sm">Anapara erken azaldığı için toplam faiz maliyeti düşer</p>
        </div>
        
        <div class="text-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h4 class="font-semibold text-gray-900 mb-2">Vade Kısalması</h4>
          <p class="text-gray-600 text-sm">Kredinin daha erken kapanması sağlanır</p>
        </div>
        
        <div class="text-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h4 class="font-semibold text-gray-900 mb-2">Nakit Akışı Esnekliği</h4>
          <p class="text-gray-600 text-sm">Elinizdeki fazla parayı değerlendirebilirsiniz</p>
        </div>
      </div>

      <div class="bg-purple-50 border border-purple-200 rounded-lg p-6 my-8">
        <h3 class="text-xl font-semibold mb-4 text-purple-800">🎈 Balon Ödeme Stratejisi</h3>
        <p class="text-gray-700">Son taksite büyük bir ara ödeme yaparak, diğer taksit tutarlarını düşürme stratejisidir. Özellikle taşıt kredilerinde, aracın satılarak kredinin kapatılması planlandığında kullanılır.</p>
      </div>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900">⚠️ Kredi Hesaplarken Dikkat Edilmesi Gerekenler</h2>

      <div class="space-y-6">
        <div class="bg-red-50 border-l-4 border-red-500 p-6">
          <h3 class="text-lg font-semibold mb-3 text-red-800">1. Brüt vs Net Faiz</h3>
          <p class="text-gray-700 mb-3">Bankalar genellikle net faiz oranını belirtir. Ancak gerçek ödeyeceğiniz faiz, KKDF ve BSMV dahil brüt faiz oranıdır:</p>
          <div class="bg-white border border-red-200 rounded p-3">
            <p class="font-mono text-sm font-medium text-gray-800">
              <strong>Brüt Faiz Oranı = Net Faiz Oranı × (1 + KKDF + BSMV) = Net Faiz × 1,20</strong>
            </p>
          </div>
        </div>

        <div class="bg-orange-50 border-l-4 border-orange-500 p-6">
          <h3 class="text-lg font-semibold mb-3 text-orange-800">2. Erken Ödeme Cezası</h3>
          <p class="text-gray-700">Bazı kredilerde erken ödeme cezası bulunabilir. Ara ödeme yapmadan önce kredi sözleşmenizi kontrol etmeyi unutmayın.</p>
        </div>

        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-6">
          <h3 class="text-lg font-semibold mb-3 text-indigo-800">3. Finansal Durum Analizi</h3>
          <p class="text-gray-700">Ara ödeme yapmadan önce acil durum fonunuzu ve diğer yatırım seçeneklerinizi değerlendirin.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-900">📊 Pratik Hesaplama Örnekleri</h2>

      <div class="grid md:grid-cols-2 gap-8 my-8">
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-semibold mb-4 text-gray-900">📝 Örnek 1: Temel Kredi Hesaplaması</h3>
          <div class="space-y-2 text-sm">
            <p><strong>Kredi Tutarı:</strong> 200.000 TL</p>
            <p><strong>Aylık Net Faiz:</strong> %3</p>
            <p><strong>Vade:</strong> 12 ay</p>
            <hr class="my-3">
            <p><strong>Brüt Faiz Oranı:</strong> %3 × 1,20 = %3,60</p>
            <p><strong>Aylık Taksit:</strong> Yaklaşık 18.300 TL</p>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-semibold mb-4 text-gray-900">💡 Örnek 2: Ara Ödemeli Kredi</h3>
          <p class="text-gray-700 mb-3">Aynı kredi koşullarında 6. ayda 50.000 TL ara ödeme yaparsanız:</p>
          <ul class="space-y-1 text-sm text-gray-600">
            <li>• Toplam faiz maliyeti azalır</li>
            <li>• Kalan taksit tutarları düşer</li>
            <li>• Kredi daha erken kapanabilir</li>
          </ul>
        </div>
      </div>

      <div class="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-8 my-12 text-center">
        <h2 class="text-xl font-bold mb-4 text-gray-900">🎯 Sonuç</h2>
        <p class="text-gray-700 max-w-4xl mx-auto leading-relaxed">
          Kredi hesaplaması, finansal planlama sürecinin en önemli parçalarından biridir. Doğru hesaplama yaparak hem bütçenizi koruyabilir hem de en uygun kredi seçeneklerini değerlendirebilirsiniz. Ara ödeme stratejileri kullanarak da toplam kredi maliyetinizi önemli ölçüde azaltabilirsiniz.
        </p>
      </div>
    </div>
  `,
  author: "Finansal Danışman",
  date: "15 Haziran 2024",
  readTime: "12 dk okuma",
  image: "/placeholder.svg",
  category: "Kredi Bilgileri",
  featured: false,
  tags: ["kredi hesaplama", "faiz oranları", "ara ödeme", "KKDF", "BSMV", "anüite", "kredi planlaması"]
};
