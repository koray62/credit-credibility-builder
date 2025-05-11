
// Blog post data for "Kredi Notu Nedir?"
export const krediNotuNedirPost = {
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
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1 – 1100</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Çok Riskli</td>
              </tr>
              <tr class="bg-orange-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1101 – 1240</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Orta Riskli</td>
              </tr>
              <tr class="bg-yellow-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1241 – 1520</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Az Riskli</td>
              </tr>
              <tr class="bg-green-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1521 – 1660</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">İyi</td>
              </tr>
              <tr class="bg-emerald-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1661 – 1900</td>
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
};
