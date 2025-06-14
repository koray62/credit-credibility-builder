
export const krediHesaplamaPost = {
  slug: "kredi-hesaplama-nasil-yapilir",
  title: "Kredi Hesaplama Nasıl Yapılır? Detaylı Rehber",
  excerpt: "Kredi ödeme planınızı hesaplamak için bilmeniz gereken her şey. Faiz oranları, KKDF, BSMV ve ara ödemeler ile ilgili detaylı bilgiler.",
  content: `
    <p>Kredi almayı düşünürken en önemli konulardan biri, kredi ödeme planınızı doğru şekilde hesaplayabilmektir. Bu yazıda, kredi hesaplama yöntemlerini ve dikkat etmeniz gereken noktaları detaylı olarak açıklayacağız.</p>

    <h2>Kredi Hesaplamasında Temel Kavramlar</h2>
    
    <h3>1. Ana Para (Anapara)</h3>
    <p>Bankadan aldığınız kredinin asıl tutarıdır. Bu tutar üzerinden faiz hesaplanır ve her taksitte anapara tutarının bir kısmını ödersiniz.</p>

    <h3>2. Faiz Oranı</h3>
    <p>Krediye uygulanan aylık faiz oranıdır. Genellikle yıllık olarak belirtilen faiz oranının 12'ye bölünmesiyle aylık faiz oranı bulunur.</p>

    <h3>3. KKDF (Kaynak Kullanımını Destekleme Fonu)</h3>
    <p>Bankaların kredi faizleri üzerinden aldığı %15 oranındaki vergidir. Bu vergi, net faiz tutarı üzerinden hesaplanır.</p>

    <h3>4. BSMV (Banka ve Sigorta Muameleleri Vergisi)</h3>
    <p>Bankaların kredi faizleri üzerinden aldığı %5 oranındaki vergidir. Bu da net faiz tutarı üzerinden hesaplanır.</p>

    <h2>Kredi Hesaplama Yöntemleri</h2>

    <h3>Anüite (Eşit Taksit) Yöntemi</h3>
    <p>En yaygın kullanılan kredi hesaplama yöntemidir. Bu yöntemde her ay sabit bir taksit tutarı ödersiniz. Taksit tutarı şu formülle hesaplanır:</p>
    
    <p><strong>Taksit Tutarı = Ana Para × (Brüt Faiz Oranı × (1 + Brüt Faiz Oranı)^Taksit Sayısı) / ((1 + Brüt Faiz Oranı)^Taksit Sayısı - 1)</strong></p>

    <h3>Azalan Bakiye Yöntemi</h3>
    <p>Bu yöntemde anapara tutarı her taksitte eşit olarak azalır, ancak faiz tutarı kalan bakiye üzerinden hesaplandığı için taksit tutarları zaman içinde azalır.</p>

    <h2>Ara Ödeme Stratejileri</h2>

    <h3>Ara Ödeme Nedir?</h3>
    <p>Ara ödeme, normal taksit ödemelerinize ek olarak yaptığınız ekstra ödemelerdir. Bu ödemeler doğrudan anapara tutarından düşülür ve toplam faiz maliyetinizi azaltır.</p>

    <h3>Ara Ödeme Avantajları</h3>
    <ul>
      <li><strong>Faiz Tasarrufu:</strong> Anapara erken azaldığı için toplam faiz maliyeti düşer</li>
      <li><strong>Vade Kısalması:</strong> Kredinin daha erken kapanması sağlanır</li>
      <li><strong>Nakit Akışı Esnekliği:</strong> Elinizdeki fazla parayı değerlendirebilirsiniz</li>
    </ul>

    <h3>Balon Ödeme Stratejisi</h3>
    <p>Son taksite büyük bir ara ödeme yaparak, diğer taksit tutarlarını düşürme stratejisidir. Özellikle taşıt kredilerinde, aracın satılarak kredinin kapatılması planlandığında kullanılır.</p>

    <h2>Kredi Hesaplarken Dikkat Edilmesi Gerekenler</h2>

    <h3>1. Brüt vs Net Faiz</h3>
    <p>Bankalar genellikle net faiz oranını belirtir. Ancak gerçek ödeyeceğiniz faiz, KKDF ve BSMV dahil brüt faiz oranıdır:</p>
    <p><strong>Brüt Faiz Oranı = Net Faiz Oranı × (1 + KKDF + BSMV) = Net Faiz × 1,20</strong></p>

    <h3>2. Erken Ödeme Cezası</h3>
    <p>Bazı kredilerde erken ödeme cezası bulunabilir. Ara ödeme yapmadan önce kredi sözleşmenizi kontrol etmeyi unutmayın.</p>

    <h3>3. Finansal Durum Analizi</h3>
    <p>Ara ödeme yapmadan önce acil durum fonunuzu ve diğer yatırım seçeneklerinizi değerlendirin.</p>

    <h2>Pratik Hesaplama Örnekleri</h2>

    <h3>Örnek 1: Temel Kredi Hesaplaması</h3>
    <p><strong>Kredi Tutarı:</strong> 200.000 TL<br>
    <strong>Aylık Net Faiz:</strong> %3<br>
    <strong>Vade:</strong> 12 ay</p>

    <p><strong>Brüt Faiz Oranı:</strong> %3 × 1,20 = %3,60<br>
    <strong>Aylık Taksit:</strong> Yaklaşık 18.300 TL</p>

    <h3>Örnek 2: Ara Ödemeli Kredi</h3>
    <p>Aynı kredi koşullarında 6. ayda 50.000 TL ara ödeme yaparsanız:</p>
    <ul>
      <li>Toplam faiz maliyeti azalır</li>
      <li>Kalan taksit tutarları düşer</li>
      <li>Kredi daha erken kapanabilir</li>
    </ul>

    <div class="my-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 class="text-lg font-semibold mb-4 text-blue-800">İnteraktif Kredi Hesaplama Aracı</h3>
      <p class="text-blue-700 mb-4">Kendi kredi hesaplamalarınızı yapmak için interaktif hesaplama aracımızı kullanabilirsiniz. Bu araç ile faiz oranları, ara ödemeler ve farklı vade seçeneklerini test edebilirsiniz.</p>
      <button 
        id="kredi-hesaplama-btn" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
        onclick="window.open('https://f847f5b5-d6af-426f-871a-f83f94bc217b.lovableproject.com/kredi-hesaplama', '_blank')"
      >
        Kredi Hesaplama Aracını Başlat
      </button>
    </div>

    <h2>Sonuç</h2>
    <p>Kredi hesaplaması, finansal planlama sürecinin en önemli parçalarından biridir. Doğru hesaplama yaparak hem bütçenizi koruyabilir hem de en uygun kredi seçeneklerini değerlendirebilirsiniz. Ara ödeme stratejileri kullanarak da toplam kredi maliyetinizi önemli ölçüde azaltabilirsiniz.</p>
  `,
  author: "Finansal Danışman",
  date: "15 Haziran 2024",
  readTime: "12 dk okuma",
  image: "/placeholder.svg",
  category: "Kredi Bilgileri",
  featured: false,
  tags: ["kredi hesaplama", "faiz oranları", "ara ödeme", "KKDF", "BSMV", "anüite", "kredi planlaması"]
};
