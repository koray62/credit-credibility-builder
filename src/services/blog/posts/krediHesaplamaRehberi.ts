
export const krediHesaplamaRehberiPost = {
  slug: "kredi-hesaplama-rehberi",
  title: "Kredi Hesaplama Nasıl Yapılır? Detaylı Rehber",
  author: "Koray Kaya",
  date: "14 Haziran 2025",
  readTime: "12 dk okuma",
  image: "/placeholder.svg",
  content: `
    <div class="prose prose-lg max-w-none">
      <p class="text-xl text-gray-600 mb-8">Kredi kullanmak, hayatın farklı dönemlerinde önemli finansal ihtiyaçları karşılamak için başvurulan yaygın bir yöntemdir. Ancak bir kredinin sadece "ne kadar alacağım" sorusuyla sınırlı olmadığını bilmek gerekir.</p>

      <div style="text-align: center; margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
        <h3 style="color: white; margin-bottom: 15px;">🧮 Kendi Kredi Planınızı Oluşturun</h3>
        <p style="color: white; margin-bottom: 20px; opacity: 0.9;">Detaylı ödeme planı oluşturun, farklı faiz oranlarını karşılaştırın</p>
        <a href="/kredi-hesaplama" style="display: inline-block; background-color: white; color: #667eea; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
          Kredi Hesaplama Aracını Kullan
        </a>
      </div>

      <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0066cc; margin: 20px 0;">
        <h4>💡 Önemli Not</h4>
        <p style="margin-bottom: 0;">Asıl önemli olan "ne kadar geri ödeyeceğim" ve "aylık ödeme planım nasıl olacak?" sorularına doğru cevaplar bulabilmektir. Bu yazıda, bireylerin ihtiyaç kredisi gibi teminatsız kredileri kullanmadan önce nasıl hesaplama yapabileceklerini detaylıca açıklıyoruz.</p>
      </div>

      <h2>1. Kredi Hesaplaması Nedir?</h2>
      <p>Kredi hesaplaması; almayı planladığınız krediye ilişkin toplam geri ödeme tutarını, aylık taksit miktarlarını ve bu ödemelerin içerisinde yer alan faiz, vergi ve masrafları ortaya koyan finansal bir planlama sürecidir.</p>

      <p>Bu hesaplama sayesinde:</p>
      <ul>
        <li><strong>Aylık bütçenizi</strong> nasıl ayarlamanız gerektiğini bilirsiniz</li>
        <li><strong>Toplam maliyeti</strong> öngörerek daha bilinçli bir karar verebilirsiniz</li>
        <li><strong>Farklı bankaların</strong> tekliflerini kıyaslayabilirsiniz</li>
      </ul>

      <h2>2. Kredi Hesaplamasında Hangi Kalemler Dikkate Alınır?</h2>
      <p>Bir kredinin toplam maliyeti yalnızca faiz oranından ibaret değildir. Aşağıdaki kalemlerin tümü değerlendirilmelidir:</p>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h4>📊 Kredi Maliyet Kalemleri</h4>
        <ul style="margin-bottom: 0;">
          <li><strong>Aylık faiz oranı</strong> (net/brüt)</li>
          <li><strong>Vade</strong> (kaç ay süreceği)</li>
          <li><strong>Kredi tutarı</strong> (ne kadar borç alınacağı)</li>
          <li><strong>KKDF (%15) ve BSMV (%5)</strong> gibi vergiler</li>
          <li><strong>Dosya masrafı, sigorta, ekspertiz</strong> gibi diğer ücretler</li>
        </ul>
      </div>

      <h2>3. Kredi Taksiti Nasıl Hesaplanır?</h2>
      <p>Taksit hesaplamasında kullanılan temel formül şudur:</p>

      <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
        <h4>🧮 Taksit Hesaplama Formülü</h4>
        <p><strong>Aylık Taksit Tutarı = K × [i × (1 + i)^n] / [(1 + i)^n – 1]</strong></p>
        <p style="margin-bottom: 0;">
          <strong>K</strong> = kredi tutarı<br>
          <strong>i</strong> = aylık faiz oranı (ondalık olarak)<br>
          <strong>n</strong> = vade (ay cinsinden)
        </p>
      </div>

      <p>Bu formül sayesinde her ay eşit taksitlerle ödeme yaparsınız. Ancak her taksit şu şekilde üçe ayrılır:</p>
      <ul>
        <li><strong>Ana para</strong></li>
        <li><strong>Faiz</strong></li>
        <li><strong>KKDF ve BSMV</strong></li>
      </ul>

      <p>Faiz tutarı her ay kalan anapara üzerinden hesaplanır. Vade ilerledikçe taksitin içindeki faiz tutarı azalır, ana para tutarı artar.</p>

      <h2>4. Brüt ve Net Faiz Arasındaki Fark</h2>
      
      <h3>Net Faiz</h3>
      <p>Yalnızca bankanın belirlediği faiz oranıdır.</p>

      <h3>Brüt Faiz</h3>
      <p>Net faize %20 vergi yükü (KKDF + BSMV) eklendikten sonraki orandır.</p>

      <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; margin: 20px 0;">
        <h4>💰 Önemli Bilgi</h4>
        <p style="margin-bottom: 0;">Brüt faiz genellikle bankaların sunduğu örnek taksit hesaplamalarında yer alır. Konut kredilerinde KKDF yoktur.</p>
      </div>

      <h2>5. Pratik Örnek: 100.000 TL Kredi Hesaplaması</h2>
      <p><strong>Kredi Detayları:</strong></p>
      <ul>
        <li>Kredi tutarı: 100.000 TL</li>
        <li>Aylık net faiz: %2,5</li>
        <li>Vade: 24 ay</li>
      </ul>

      <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h4>📋 Hesaplama Sonuçları</h4>
        <ul>
          <li><strong>Aylık brüt faiz:</strong> 2,5% × 1,2 = 3,00%</li>
          <li><strong>Taksit tutarı:</strong> yaklaşık 5.384,26 TL</li>
        </ul>
        
        <h5>İlk Ay Detay Hesabı:</h5>
        <ul style="margin-bottom: 0;">
          <li><strong>Faiz:</strong> 100.000 × 0,025 = 2.500 TL</li>
          <li><strong>KKDF:</strong> 375 TL</li>
          <li><strong>BSMV:</strong> 125 TL</li>
          <li><strong>Ana Para:</strong> 5.384,26 – 2.500 – 375 – 125 = 2.384,26 TL</li>
          <li><strong>Kalan anapara:</strong> 100.000 – 2.384,26 = 97.615,74 TL</li>
        </ul>
      </div>

      <h2>6. Kredi Hesaplamada Sık Yapılan Hatalar</h2>
      
      <div style="background-color: #f8d7da; padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545; margin: 20px 0;">
        <h4>⚠️ Dikkat Edilmesi Gerekenler</h4>
        <ul style="margin-bottom: 0;">
          <li><strong>Sadece faiz oranına odaklanmak,</strong> vergi ve masrafları göz ardı etmek</li>
          <li><strong>Gelir düzeyine uygun olmayan</strong> vade seçimi</li>
          <li><strong>Erken ödeme ihtimalini</strong> değerlendirmemek</li>
          <li><strong>Ara ödeme</strong> alternatifleri ile aylık taksit tutarlarını düşürmeyi değerlendirmemek</li>
        </ul>
      </div>

      <h2>7. Karar Verirken Nelere Dikkat Etmelisiniz?</h2>
      
      <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; border-left: 4px solid #0c5460; margin: 20px 0;">
        <h4>✅ Altın Kurallar</h4>
        <ul style="margin-bottom: 0;">
          <li><strong>Kredi ödemeleri</strong> net aylık gelirinizin %40'ını aşmamalıdır</li>
          <li><strong>Vade uzadıkça</strong> aylık ödeme azalır ama toplam faiz yükü artar</li>
          <li><strong>Ödeme gücünüz</strong> varsa, yüksek taksitli kısa vadeli krediler daha avantajlı olabilir</li>
        </ul>
      </div>

      <h2>Merak Edilen Konular</h2>
      
      <h3>-En uygun kredi vadesi nasıl belirlenir?</h3>
      <p>Aylık ödeme kapasitesi ve toplam faiz maliyeti arasında denge kurmalısınız. Kısa vade daha az faiz, uzun vade daha düşük taksit anlamına gelir.</p>
      
      <h3>-Erken ödeme yapmak avantajlı mı?</h3>
      <p>Evet, erken ödeme toplam faiz yükünüzü azaltır. Ancak konut kredileri için bankanın erken ödeme komisyonu olup olmadığını kontrol edin.</p>
      
      <h3>-Vade içerisinde ödeme planı revizesi yapılabilir mi?</h3>
      <p>Evet, bankanıza başvurarak vade içerisinde ödeme planı revizesi talep edebilirsiniz.</p>

      <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; margin: 30px 0;">
        <h4>✅ Sonuç</h4>
        <p style="margin-bottom: 0;">Doğru kredi hesaplaması, finansal planlamanızın temelini oluşturur. Hesaplama aracımızı kullanarak kendi durumunuza en uygun ödeme planını oluşturun ve bilinçli kararlar alın.</p>
      </div>
    </div>
  `
};
