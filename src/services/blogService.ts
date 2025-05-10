
import React from 'react';

// Blog post data structure
export interface BlogPostType {
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  image: string;
}

// Author data structure
interface AuthorInfo {
  name: string;
  role: string; // Add the role property
  bio: string;
  avatar: string;
}

// Related post data structure
interface RelatedPost {
  title: string;
  slug: string;
  date: string;
  image: string;
}

// This would normally come from a database or API
export const getBlogPosts = (): Record<string, BlogPostType> => {
  return {
    "kredi-notu-nedir": {
      slug: "kredi-notu-nedir",
      title: "Kredi Notu Nedir? Nasıl Hesaplanır?",
      author: "Koray Kaya",
      date: "10 Haziran 2023",
      readTime: "8 dk okuma",
      image: "/placeholder.svg",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed text-gray-700">
            Günümüzde bankalarla olan ilişkilerimizde, hatta bazen günlük yaşamda karşımıza çıkan en kritik sayılardan biri: Kredi Notu. Kredi kartı başvurusundan konut kredisine, araç kiralamadan telefon faturası açtırmaya kadar birçok alanda kredi notunuz sizin hakkınızdaki ilk izlenimi verir.
          </p>
          <p class="text-lg leading-relaxed text-gray-700">
            Peki bu skor tam olarak nedir, nasıl hesaplanır ve nasıl yükseltilir? Gelin birlikte inceleyelim.
          </p>
          
          <div class="border-y border-gray-200 py-6">
            <h2 class="text-2xl font-bold mb-4 text-primary">Kredi Notu Nedir?</h2>
            <p class="text-lg leading-relaxed text-gray-700">
              Kredi notu, bireylerin finansal güvenilirliğini sayısal bir değerle ifade eden sistemdir. Türkiye'de bu skoru, Kredi Kayıt Bürosu (KKB) oluşturur ve bireylere Findeks platformu aracılığıyla sunar. Kredi notu, 1 ile 1900 puan arasında değişir. Bu değer, bankalara sizin borçlarınıza sadık bir birey olup olmadığınızı gösterir.
            </p>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                <div class="flex items-start">
                  <div class="text-green-500 mr-2 mt-1">✓</div>
                  <p class="font-medium">Yüksek kredi notu = Bankalar için güven</p>
                </div>
              </div>
              <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                <div class="flex items-start">
                  <div class="text-red-500 mr-2 mt-1">✗</div>
                  <p class="font-medium">Düşük kredi notu = Riskli müşteri profili</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="border-b border-gray-200 py-6">
            <h2 class="text-2xl font-bold mb-4 text-primary">Kredi Notunun Hayattaki Yeri</h2>
            <p class="text-lg leading-relaxed text-gray-700 mb-4">
              Birçok kişi kredi notunu sadece bankacılıkla ilişkilendirir. Oysa bu not; ev kiralamadan sigorta primi belirlemeye, bazı iş başvurularından fatura aboneliklerine kadar geniş bir alanda kullanılır:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-lg text-gray-700">
              <li>Kredi kartı ve kredi başvuruları</li>
              <li>Ev ve araç kiralama işlemleri</li>
              <li>Cep telefonu tarifesi onay süreçleri</li>
              <li>Bazı işveren değerlendirmeleri</li>
            </ul>
            <p class="text-lg leading-relaxed text-gray-700 mt-4">
              Finansal itibarınız bu sayıyla temsil edilir. Bu nedenle sadece kredi almak isteyenlerin değil, herkesin kredi notunu bilmesi ve yönetmesi gerekir.
            </p>
          </div>
          
          <div class="py-6">
            <h2 class="text-2xl font-bold mb-6 text-primary">Kredi Notu Nasıl Hesaplanır?</h2>
            <p class="text-lg leading-relaxed text-gray-700 mb-6">
              Kredi notu; finansal geçmişinize, borç durumunuza ve ödeme alışkanlıklarınıza göre belirli ağırlıklarla hesaplanır. Aşağıda, Findeks tarafından belirlenen kriterleri ve oranlarını görebilirsiniz:
            </p>
            
            <div class="w-full">
              <div class="border rounded-lg mb-4 overflow-hidden">
                <div class="px-4 py-3 hover:no-underline bg-gradient-to-r from-primary-light to-white">
                  <div class="flex items-center text-primary-dark">
                    <div class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3">
                      <span class="font-bold">1</span>
                    </div>
                    <span class="font-semibold text-lg">Kredili Ürün Ödeme Alışkanlıkları — %45</span>
                  </div>
                </div>
                <div class="px-4 py-3 bg-white">
                  <p class="mb-3">Bu, kredi notunu belirleyen en önemli faktördür.</p>
                  <ul class="list-disc pl-6 space-y-2">
                    <li>Kredi ve kredi kartı borçlarınızı zamanında ödüyorsanız, notunuz artar.</li>
                    <li>Ödemelerin son ödeme tarihinden sonra yapılması, notunuzu olumsuz etkiler.</li>
                  </ul>
                  <div class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
                    <p class="font-medium">Unutmayın: Bir günlük gecikme bile kredi notunuza yansır.</p>
                  </div>
                </div>
              </div>
              
              <div class="border rounded-lg mb-4 overflow-hidden">
                <div class="px-4 py-3 hover:no-underline bg-gradient-to-r from-primary-light to-white">
                  <div class="flex items-center text-primary-dark">
                    <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                      <span class="font-bold">2</span>
                    </div>
                    <span class="font-semibold text-lg">Mevcut Hesap ve Borç Durumu — %32</span>
                  </div>
                </div>
                <div class="px-4 py-3 bg-white">
                  <ul class="list-disc pl-6 space-y-2">
                    <li>Kredi kartı ve kredi hesaplarınızın bakiyeleri</li>
                    <li>Teminatlı ve teminatsız borçlarınız</li>
                    <li>Kredi limitinizin ne kadarını kullandığınız</li>
                    <li>Önceki kredilerin kapanış biçimi (zamanında mı, gecikmeli mi?)</li>
                  </ul>
                  <div class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800">
                    <p class="font-medium">Düşük borç/limit oranı, sistem tarafından olumlu değerlendirilir.</p>
                  </div>
                </div>
              </div>
              
              <div class="border rounded-lg mb-4 overflow-hidden">
                <div class="px-4 py-3 hover:no-underline bg-gradient-to-r from-primary-light to-white">
                  <div class="flex items-center text-primary-dark">
                    <div class="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center mr-3">
                      <span class="font-bold">3</span>
                    </div>
                    <span class="font-semibold text-lg">Kredi Kullanım Yoğunluğu — %18</span>
                  </div>
                </div>
                <div class="px-4 py-3 bg-white">
                  <p class="mb-3">Hiç kredi kullanmamış olmak, sistem tarafından bilinmezlik olarak görülür ve düşük puanla sonuçlanabilir.</p>
                  <p>Kredi ürünü kullanan, bu ürünleri düzenli ödeyen bireyler, daha ölçülebilir ve güvenilir bulunur.</p>
                </div>
              </div>
              
              <div class="border rounded-lg mb-4 overflow-hidden">
                <div class="px-4 py-3 hover:no-underline bg-gradient-to-r from-primary-light to-white">
                  <div class="flex items-center text-primary-dark">
                    <div class="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center mr-3">
                      <span class="font-bold">4</span>
                    </div>
                    <span class="font-semibold text-lg">Yeni Kredili Ürün Açılışları — %5</span>
                  </div>
                </div>
                <div class="px-4 py-3 bg-white">
                  <p class="mb-3">Yeni açılan krediler henüz ödeme geçmişine sahip değildir ve riskli olarak değerlendirilir.</p>
                  <p>Ayrıca kısa sürede çok sayıda kredi başvurusu yapmak da notunuzu aşağı çekebilir.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="py-6">
            <h2 class="text-2xl font-bold mb-4 text-primary">Kredi Notu Aralıkları</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kredi Notu</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Değerlendirmesi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr class="bg-red-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1 – 699</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Çok Riskli</td>
                  </tr>
                  <tr class="bg-orange-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">700 – 1099</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Orta Riskli</td>
                  </tr>
                  <tr class="bg-yellow-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1100 – 1499</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Az Riskli</td>
                  </tr>
                  <tr class="bg-green-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1500 – 1699</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">İyi</td>
                  </tr>
                  <tr class="bg-emerald-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1700 – 1900</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Çok İyi</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="text-gray-600 mt-3">
              Her banka bu aralıkları kendi kredi politikalarına göre yorumlayabilir. Ancak genel eğilim, 1500 ve üzerindeki notların güvenilir müşteri olarak kabul edildiği yönündedir.
            </p>
          </div>
          
          <div class="py-6">
            <h2 class="text-2xl font-bold mb-6 text-primary">Kredi Notunu Etkileyen Olumlu ve Olumsuz Davranışlar</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="border-green-200 shadow-sm rounded-lg border bg-card text-card-foreground">
                <div class="pt-6 p-6">
                  <div class="flex items-center mb-4">
                    <div class="h-6 w-6 text-green-500 mr-2">✓</div>
                    <h3 class="text-xl font-semibold text-green-700">Olumlu Etkiler</h3>
                  </div>
                  <ul class="space-y-2 pl-4">
                    <li class="flex items-start">
                      <span class="text-green-500 mr-2">✓</span>
                      <span>Ödemeleri zamanında yapmak</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-green-500 mr-2">✓</span>
                      <span>Kredi kartı borcunu asgari tutarın üzerinde ödemek</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-green-500 mr-2">✓</span>
                      <span>Kredi ürünlerini düzenli ve uzun süreli kullanmak</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-green-500 mr-2">✓</span>
                      <span>Kredi kartı limitinizin tamamını değil, bir kısmını kullanmak</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-green-500 mr-2">✓</span>
                      <span>Otomatik ödeme talimatı vermek</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div class="border-red-200 shadow-sm rounded-lg border bg-card text-card-foreground">
                <div class="pt-6 p-6">
                  <div class="flex items-center mb-4">
                    <div class="h-6 w-6 text-red-500 mr-2">✗</div>
                    <h3 class="text-xl font-semibold text-red-700">Olumsuz Etkiler</h3>
                  </div>
                  <ul class="space-y-2 pl-4">
                    <li class="flex items-start">
                      <span class="text-red-500 mr-2">✗</span>
                      <span>Gecikmeli ya da düzensiz ödemeler</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-red-500 mr-2">✗</span>
                      <span>Kredi kartı limitinin tamamını doldurmak</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-red-500 mr-2">✗</span>
                      <span>Sık kredi başvurusu yapmak</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-red-500 mr-2">✗</span>
                      <span>Yeni açılan kredilerde ödeme geçmişi oluşturamamak</span>
                    </li>
                    <li class="flex items-start">
                      <span class="text-red-500 mr-2">✗</span>
                      <span>İcra, haciz gibi yasal takip süreçlerine dahil olmak</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="py-6">
            <h2 class="text-2xl font-bold mb-4 text-primary">Kredi Notumu Nereden Öğrenebilirim?</h2>
            <p class="text-lg leading-relaxed text-gray-700 mb-4">
              Kredi notunuzu öğrenmek için kullanabileceğiniz güvenilir yollar:
            </p>
            <div class="space-y-3">
              <div class="flex items-center bg-blue-50 p-4 rounded-lg">
                <div class="text-blue-500 mr-2" style="width: 20px; height: 20px;">i</div>
                <p class="font-medium"><a href="https://www.findeks.com" class="text-blue-700 hover:underline">www.findeks.com</a> – Türkiye'de kredi notu sorgulamanın en yaygın ve güvenilir platformudur.</p>
              </div>
              <div class="flex items-center bg-blue-50 p-4 rounded-lg">
                <div class="text-blue-500 mr-2" style="width: 20px; height: 20px;">i</div>
                <p class="font-medium">Mobil bankacılık uygulamaları – Pek çok banka, Findeks iş birliği ile müşterilerine not bilgisini ücretsiz sunar.</p>
              </div>
              <div class="flex items-center bg-blue-50 p-4 rounded-lg">
                <div class="text-blue-500 mr-2" style="width: 20px; height: 20px;">i</div>
                <p class="font-medium">Yıllık ücretsiz rapor hakkı – KKB veya bazı banka kanallarından yılda 1 kez ücretsiz rapor alınabilir.</p>
              </div>
            </div>
          </div>
          
          <div class="py-6">
            <h2 class="text-2xl font-bold mb-4 text-primary">Kredi Notunu Yükseltmenin Yolları</h2>
            <div class="bg-primary-light p-6 rounded-lg">
              <ol class="list-decimal pl-6 space-y-3">
                <li class="text-lg">Ödemelerinizi her zaman zamanında yapın.</li>
                <li class="text-lg">Limitinizin tamamını değil, bir kısmını kullanın.</li>
                <li class="text-lg">Borçlarınızı yapılandırarak azaltın.</li>
                <li class="text-lg">Yeni kredi başvurularını sınırlı tutun.</li>
                <li class="text-lg">Küçük tutarlı kredi ürünleriyle düzenli ödeme geçmişi oluşturun.</li>
                <li class="text-lg">Kapanan kredilerinizi iyi durumda kapatın.</li>
              </ol>
              <p class="mt-4 text-primary-dark">
                Bu adımlar, kredi notunuzun zaman içinde istikrarlı bir şekilde artmasını sağlar.
              </p>
            </div>
          </div>
          
          <div class="py-6 border-t border-gray-200">
            <h2 class="text-2xl font-bold mb-4 text-primary">Sonuç: Kredi Notu, Finansal Refahın Kapısıdır</h2>
            <p class="text-lg leading-relaxed text-gray-700 mb-4">
              Kredi notu, finansal sağlığınızın kısa bir özetidir. Bu puanı sadece borç almak için değil, finansal özgürlüğünüzü yönetmek için de ciddiye almalısınız.
            </p>
            <p class="text-lg leading-relaxed text-gray-700 mb-4">
              Düzenli ödeme alışkanlığı, borç yönetimi ve disiplinli bütçe kontrolüyle kredi notunuzu güçlendirebilir, hayatınızın birçok alanında avantajlı konuma geçebilirsiniz.
            </p>
            <div class="bg-primary bg-opacity-10 p-5 rounded-lg border border-primary border-opacity-20 mt-6">
              <p class="text-lg font-medium text-primary-dark mb-2">
                Notunuzu öğrenmek ve takipte kalmak için:
              </p>
              <a 
                href="https://www.findeks.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="inline-flex items-center text-primary-dark hover:text-primary transition-colors text-lg font-medium"
              >
                <span class="mr-2" style="width: 20px; height: 20px;">📄</span>
                www.findeks.com
              </a>
            </div>
          </div>
        </div>
      `
    },
    
    "hic-kredi-kullanmadim": {
      slug: "hic-kredi-kullanmadim",
      title: "Hiç Kredi Kullanmadım, Nasıl Kredibilite Oluşturabilirim?",
      author: "Ayşe Yılmaz",
      date: "5 Haziran 2023",
      readTime: "5 dk okuma",
      image: "/placeholder.svg",
      content: `
        <div class="space-y-6">
          <p class="text-lg leading-relaxed text-gray-700">
            Kredi notu deyince aklınıza hemen borçlanmak geliyorsa yalnız değilsiniz. Ancak ilginç bir gerçek var: 
            Hiç borçlanmamış olmak da finansal sistem gözünde riskli görülebilir. Çünkü kredi notunuzun oluşabilmesi 
            için sistemin sizi tanıması, yani finansal geçmişinizi analiz edebilmesi gerekir.
          </p>
          <p class="text-lg leading-relaxed text-gray-700">
            Peki hiç kredi ya da kredi kartı kullanmadıysanız, krediye erişiminizi engelleyen bu görünmez duvarı nasıl aşabilirsiniz?
          </p>
          <p class="text-lg leading-relaxed text-gray-700">
            Bu yazıda, hiç kredi kullanmamış bireylerin finansal itibarı nasıl inşa edebileceğini adım adım anlatıyoruz.
          </p>
          
          <div class="border-y border-gray-200 py-6">
            <h2 class="text-2xl font-bold mb-4 text-primary">Kredi Notu Olmayanlar: "Görünmeyen Müşteriler"</h2>
            <p class="text-lg leading-relaxed text-gray-700 mb-4">
              Kredi notu, kişisel finans geçmişinizin sayısal ifadesidir. Ancak sistemde hiç yer almayan bireyler için 
              bu not hesaplanamaz. Bu durum, sizin riskli olduğunuz anlamına gelmese de ölçülemeyen bir profil olduğunuz 
              için bankalar açısından temkinli yaklaşılması gereken biri olarak değerlendirilirsiniz.
            </p>
            <p class="text-lg leading-relaxed text-gray-700 mb-3">
              Kredi notu oluşturamamanızın nedenleri neler olabilir?
            </p>
            <ul class="list-disc pl-6 space-y-2 text-lg text-gray-700 mb-4">
              <li>Hiç kredi veya kredi kartı almamış olmanız</li>
              <li>Son 12 ay ayda aktif bir kredili ürününüzün olmaması</li>
              <li>Sadece nakit ağırlıklı bir yaşam sürdürüyor olmanız</li>
              <li>Yasal takibe intikal eden kredilerinizin olması</li>
            </ul>
            <p class="text-lg font-medium text-primary-dark">
              Finansal sistem sizi tanımıyor olabilir, ama bu durum değiştirilebilir.
            </p>
          </div>
          
          <div class="border-b border-gray-200 py-6">
            <h2 class="text-2xl font-bold mb-4 text-primary">Kredibilite Nedir ve Neden Önemlidir?</h2>
            <p class="text-lg leading-relaxed text-gray-700 mb-4">
              Kredibilite, finansal taahhütlerinizi yerine getirme konusundaki güvenilirliğinizdir. 
              Sadece bankalar için değil; ev sahipleri, işverenler, GSM operatörleri, hatta bazı özel 
              okul kayıtları bile kredibilitenizi dikkate alabilir.
            </p>
            <p class="text-lg leading-relaxed text-gray-700 mb-3">
              Güçlü bir kredibilite:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-lg text-gray-700">
              <li>Bankalardan kolay ve hızlı onay alma şansı sağlar</li>
              <li>Daha düşük faizli kredi teklifleri getirir</li>
              <li>Yüksek limitli kredi kartlarına erişim imkânı sunar</li>
              <li>Finansal özgüven ve bağımsızlık kazandırır</li>
              <li>Araç kiralama, senetle alışveriş yapma, şimdi al sonra öde imkanlarından faydalanma vb gibi hayatınızı kolaylaştıracak pek çok hizmete ulaşabilmenizi sağlar</li>
            </ul>
            <p class="text-lg leading-relaxed text-gray-700 mt-4">
              Hiç kredi kullanmamış olmanız bu avantajlardan mahrum kalmanıza yol açabilir. Ancak aşağıdaki adımlarla bunu aşmak mümkün.
            </p>
          </div>
          
          <div class="bg-primary-light bg-opacity-20 rounded-xl p-6 border border-primary-light my-8">
            <h2 class="text-2xl font-bold mb-4 text-primary flex items-center">
              <span class="bg-primary text-white p-2 rounded-full mr-3">💡</span> 
              Kredibilitenizi Oluşturmak İçin: SkorUp Yanınızda
            </h2>
            <p class="text-lg leading-relaxed text-gray-700 mb-4">
              Kredi notunuz yoksa ya da çok düşükse, bu sizi bankalar için görünmez yapabilir. 
              Ama artık bu görünmezliği adım adım aşmanıza yardımcı olacak bir dijital rehber var:
            </p>
            
            <div class="bg-white rounded-lg p-5 shadow-sm mb-5">
              <div class="flex items-center mb-3">
                <div class="bg-primary rounded-full p-2 text-white mr-3">🎯</div>
                <h3 class="text-xl font-semibold text-primary">SkorUp – Kredibilite Asistanı</h3>
              </div>
              
              <h4 class="font-medium text-gray-800 mb-2">SkorUp Nedir?</h4>
              <p class="mb-4 text-gray-700">
                SkorUp, kredi geçmişi olmayan ya da düşük kredi notuna sahip bireylerin kredibilite 
                inşa etmesini kolaylaştıran kişiselleştirilmiş bir dijital asistandır. Sizi analiz eder, 
                bulunduğunuz noktadan başlayarak kredi notu oluşturmanız ve artırmanız için size özel adımlar önerir.
              </p>
              
              <h4 class="font-medium text-gray-800 mb-2">Ne İşe Yarar?</h4>
              <p class="mb-3 text-gray-700">SkorUp sayesinde:</p>
              <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Kredi notu oluşturmak için hangi adımları atmanız gerektiğini öğrenirsiniz</li>
                <li>Bankalara görünür hale gelmenizi sağlayan stratejilerle tanışırsınız</li>
                <li>Para biriktirme disiplini kazanırken aynı zamanda kredi notunuzu yükseltirsiniz</li>
                <li>Kredibilitenizi zamanla artırarak daha kolay kredi alabilir, daha düşük faiz oranlarından yararlanabilirsiniz</li>
              </ul>
            </div>
            
            <div class="bg-white rounded-lg p-5 shadow-sm mb-5">
              <h4 class="font-medium text-gray-800 mb-2">SkorUp Kimler İçin Uygun?</h4>
              <ul class="list-disc pl-6 space-y-2 text-gray-700">
                <li>Hiç kredi kullanmamış, kredi sistemine yeni dahil olacak bireyler</li>
                <li>Öğrenciler veya yeni mezunlar</li>
                <li>Çalışmaya yeni başlayanlar</li>
                <li>Kredi notu düşük olduğu için başvuruları reddedilenler</li>
                <li>Faiz hassasiyeti olanlar</li>
              </ul>
              <p class="mt-4 text-primary-dark font-medium">
                Eğer "nereden başlayacağımı bilmiyorum" diyorsanız, SkorUp sizin için hem pusula hem yol haritası olacak.
              </p>
            </div>
            
            <div class="bg-white rounded-lg p-5 shadow-sm">
              <h4 class="font-medium text-gray-800 mb-3">Nasıl Başlanır?</h4>
              <ol class="list-decimal pl-6 space-y-3 text-gray-700">
                <li>SkorUp platformuna kayıt olun.</li>
                <li>Birikim yapmak istediğiniz aylık ödeme tutarını belirleyin.</li>
                <li>Birikimi kaç ay yapmak istediğinizi belirtin.</li>
                <li>SkorUp başvurunuzu anlaşmalı bankaya ilettikten sonra sıfır faizli kredi tutarınız blokeli hesabınıza geçsin.</li>
                <li>Vade sonunda bloke çözülerek hem yaptığınız birikim kullanımınıza açılsın hem de kredi notunuz oluşsun.</li>
              </ol>
            </div>
            
            <div class="mt-6 text-center">
              <p class="text-lg font-semibold text-primary-dark mb-4">
                Sonuç: Dijital Destekle Kredibiliteyi Güçlendirin
              </p>
              <p class="mb-4 text-gray-700">
                Hiç kredi kullanmamış olmak artık bir engel değil. SkorUp gibi akıllı çözümler, bu yolu daha güvenli ve verimli hale getiriyor.
              </p>
              <p class="mb-4 text-gray-700">
                Krediye erişimin ilk adımı kredibilite inşa etmektir ve bunu doğru bir rehberle yapmak, süreci hem hızlandırır hem kolaylaştırır.
              </p>
              <p class="mb-5 text-gray-700">
                Kredibilitenizi bugünden inşa etmeye başlamak için SkorUp'ı deneyin.
                Size özel yol haritanız bir tık uzağınızda.
              </p>
              
              <a 
                href="https://www.skorup.com.tr" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="inline-flex items-center text-white bg-primary hover:bg-primary-dark transition-colors px-6 py-3 rounded-lg font-medium"
              >
                SkorUp ile tanışın ve ilk adımı atın <span class="ml-2">→</span>
              </a>
            </div>
          </div>
          
          <div class="py-6 border-b border-gray-200">
            <h2 class="text-2xl font-bold mb-4 text-primary">Kredi Notu Ne Zaman Oluşmaya Başlar?</h2>
            <p class="text-lg leading-relaxed text-gray-700 mb-4">
              İlk kredinizi aldıktan ve 3 ay düzenli ödeme yaptıktan sonra, kredi notunuz oluşmaya başlar. 
              Ancak bu notun güvenilir seviyelere çıkması için en az 12 aylık düzenli davranış gerekir.
            </p>
            <div class="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
              <p class="font-medium text-yellow-800">
                <strong>Not:</strong> Kredi notunuzun oluşup oluşmadığını www.findeks.com adresinden sorgulayabilirsiniz. 
                İlk sorgulamanızda notunuz oluşmamışsa, "risk raporu oluşturulamadı" şeklinde bilgi alabilirsiniz. Bu durum geçicidir.
              </p>
            </div>
          </div>
          
          <div class="py-6">
            <h2 class="text-2xl font-bold mb-6 text-primary">Sık Yapılan Hatalar ve Dikkat Edilmesi Gerekenler</h2>
            <div class="bg-red-50 rounded-lg p-5 border border-red-100 space-y-3 mb-6">
              <div class="flex items-start">
                <div class="text-red-500 mr-2 mt-1 flex-shrink-0" style="width: 20px; height: 20px;">✗</div>
                <p class="text-gray-700">
                  <strong>Kredi kartı ve kredili mevduat hesaplarındaki limitin tamamını kullanmak:</strong> Risk algısını artırır.
                </p>
              </div>
              <div class="flex items-start">
                <div class="text-red-500 mr-2 mt-1 flex-shrink-0" style="width: 20px; height: 20px;">✗</div>
                <p class="text-gray-700">
                  <strong>Sık kredi başvurusu yapmak:</strong> Kredi notu oluşmamışken çok sayıda başvuru, sistem tarafından "çaresiz borç arayışı" olarak yorumlanabilir.
                </p>
              </div>
              <div class="flex items-start">
                <div class="text-red-500 mr-2 mt-1 flex-shrink-0" style="width: 20px; height: 20px;">✗</div>
                <p class="text-gray-700">
                  <strong>Aile fertleri adına kredi almak:</strong> Başkası üzerinden kredi kullanmak sizin kredibilitenize katkı sağlamaz.
                </p>
              </div>
              <div class="flex items-start">
                <div class="text-red-500 mr-2 mt-1 flex-shrink-0" style="width: 20px; height: 20px;">✗</div>
                <p class="text-gray-700">
                  <strong>Kredi taksitlerini vadesinden önce yatırmak:</strong> Ekstra bir fayda sağlamaz
                </p>
              </div>
            </div>
          </div>
        </div>
      `
    }
  };
};

// Get author information
export const getAuthorInfo = (authorName: string): AuthorInfo => {
  // This would normally come from a database
  return {
    name: authorName,
    role: "Finans Uzmanı", // Add a default role
    bio: "Finans ve ekonomi konularında uzman yazar.",
    avatar: "/placeholder.svg"
  };
};

// Get related posts
export const getRelatedPosts = (): RelatedPost[] => {
  // This would normally come from a database and would be related to the current post
  return [
    {
      title: "Findeks Raporu Nedir? Nasıl Yorumlanır?",
      slug: "findeks-raporu-nedir",
      date: "28 Mayıs 2023",
      image: "/placeholder.svg"
    },
    {
      title: "Finansal Disiplin: Düzenli Tasarruf ve Ödeme Alışkanlıkları",
      slug: "finansal-disiplin",
      date: "22 Mayıs 2023",
      image: "/placeholder.svg"
    }
  ];
};
