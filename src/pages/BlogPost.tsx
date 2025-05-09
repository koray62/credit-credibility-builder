
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { 
  CalendarIcon, 
  Clock, 
  User, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle,
  FileText,
  BadgeInfo
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

// Blog post data structure
interface BlogPostType {
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  content: React.ReactNode;
  image: string;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // This would normally come from a database
  const blogPosts: Record<string, BlogPostType> = {
    "kredi-notu-nedir": {
      slug: "kredi-notu-nedir",
      title: "Kredi Notu Nedir? Nasıl Hesaplanır?",
      author: "Koray Kaya",
      date: "10 Haziran 2023",
      readTime: "8 dk okuma",
      image: "/placeholder.svg",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-gray-700">
            Günümüzde bankalarla olan ilişkilerimizde, hatta bazen günlük yaşamda karşımıza çıkan en kritik sayılardan biri: Kredi Notu. Kredi kartı başvurusundan konut kredisine, araç kiralamadan telefon faturası açtırmaya kadar birçok alanda kredi notunuz sizin hakkınızdaki ilk izlenimi verir.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Peki bu skor tam olarak nedir, nasıl hesaplanır ve nasıl yükseltilir? Gelin birlikte inceleyelim.
          </p>
          
          <div className="border-y border-gray-200 py-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Kredi Notu Nedir?</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Kredi notu, bireylerin finansal güvenilirliğini sayısal bir değerle ifade eden sistemdir. Türkiye'de bu skoru, Kredi Kayıt Bürosu (KKB) oluşturur ve bireylere Findeks platformu aracılığıyla sunar. Kredi notu, 1 ile 1900 puan arasında değişir. Bu değer, bankalara sizin borçlarınıza sadık bir birey olup olmadığınızı gösterir.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-1" size={20} />
                  <p className="font-medium">Yüksek kredi notu = Bankalar için güven</p>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-start">
                  <XCircle className="text-red-500 mr-2 mt-1" size={20} />
                  <p className="font-medium">Düşük kredi notu = Riskli müşteri profili</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200 py-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Kredi Notunun Hayattaki Yeri</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Birçok kişi kredi notunu sadece bankacılıkla ilişkilendirir. Oysa bu not; ev kiralamadan sigorta primi belirlemeye, bazı iş başvurularından fatura aboneliklerine kadar geniş bir alanda kullanılır:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
              <li>Kredi kartı ve kredi başvuruları</li>
              <li>Ev ve araç kiralama işlemleri</li>
              <li>Cep telefonu tarifesi onay süreçleri</li>
              <li>Bazı işveren değerlendirmeleri</li>
            </ul>
            <p className="text-lg leading-relaxed text-gray-700 mt-4">
              Finansal itibarınız bu sayıyla temsil edilir. Bu nedenle sadece kredi almak isteyenlerin değil, herkesin kredi notunu bilmesi ve yönetmesi gerekir.
            </p>
          </div>
          
          <div className="py-6">
            <h2 className="text-2xl font-bold mb-6 text-primary">Kredi Notu Nasıl Hesaplanır?</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Kredi notu; finansal geçmişinize, borç durumunuza ve ödeme alışkanlıklarınıza göre belirli ağırlıklarla hesaplanır. Aşağıda, Findeks tarafından belirlenen kriterleri ve oranlarını görebilirsiniz:
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="factor-1" className="border rounded-lg mb-4 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gradient-to-r from-primary-light to-white">
                  <div className="flex items-center text-primary-dark">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3">
                      <span className="font-bold">1</span>
                    </div>
                    <span className="font-semibold text-lg">Kredili Ürün Ödeme Alışkanlıkları — %45</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-white">
                  <p className="mb-3">Bu, kredi notunu belirleyen en önemli faktördür.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Kredi ve kredi kartı borçlarınızı zamanında ödüyorsanız, notunuz artar.</li>
                    <li>Ödemelerin son ödeme tarihinden sonra yapılması, notunuzu olumsuz etkiler.</li>
                  </ul>
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
                    <p className="font-medium">Unutmayın: Bir günlük gecikme bile kredi notunuza yansır.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="factor-2" className="border rounded-lg mb-4 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gradient-to-r from-primary-light to-white">
                  <div className="flex items-center text-primary-dark">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
                      <span className="font-bold">2</span>
                    </div>
                    <span className="font-semibold text-lg">Mevcut Hesap ve Borç Durumu — %32</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-white">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Kredi kartı ve kredi hesaplarınızın bakiyeleri</li>
                    <li>Teminatlı ve teminatsız borçlarınız</li>
                    <li>Kredi limitinizin ne kadarını kullandığınız</li>
                    <li>Önceki kredilerin kapanış biçimi (zamanında mı, gecikmeli mi?)</li>
                  </ul>
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800">
                    <p className="font-medium">Düşük borç/limit oranı, sistem tarafından olumlu değerlendirilir.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="factor-3" className="border rounded-lg mb-4 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gradient-to-r from-primary-light to-white">
                  <div className="flex items-center text-primary-dark">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center mr-3">
                      <span className="font-bold">3</span>
                    </div>
                    <span className="font-semibold text-lg">Kredi Kullanım Yoğunluğu — %18</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-white">
                  <p className="mb-3">Hiç kredi kullanmamış olmak, sistem tarafından bilinmezlik olarak görülür ve düşük puanla sonuçlanabilir.</p>
                  <p>Kredi ürünü kullanan, bu ürünleri düzenli ödeyen bireyler, daha ölçülebilir ve güvenilir bulunur.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="factor-4" className="border rounded-lg mb-4 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gradient-to-r from-primary-light to-white">
                  <div className="flex items-center text-primary-dark">
                    <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center mr-3">
                      <span className="font-bold">4</span>
                    </div>
                    <span className="font-semibold text-lg">Yeni Kredili Ürün Açılışları — %5</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 bg-white">
                  <p className="mb-3">Yeni açılan krediler henüz ödeme geçmişine sahip değildir ve riskli olarak değerlendirilir.</p>
                  <p>Ayrıca kısa sürede çok sayıda kredi başvurusu yapmak da notunuzu aşağı çekebilir.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="py-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Kredi Notu Aralıkları</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kredi Notu</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Değerlendirmesi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-red-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1 – 699</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Çok Riskli</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">700 – 1099</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Orta Riskli</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1100 – 1499</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Az Riskli</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1500 – 1699</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">İyi</td>
                  </tr>
                  <tr className="bg-emerald-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1700 – 1900</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Çok İyi</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 mt-3">
              Her banka bu aralıkları kendi kredi politikalarına göre yorumlayabilir. Ancak genel eğilim, 1500 ve üzerindeki notların güvenilir müşteri olarak kabul edildiği yönündedir.
            </p>
          </div>
          
          <div className="py-6">
            <h2 className="text-2xl font-bold mb-6 text-primary">Kredi Notunu Etkileyen Olumlu ve Olumsuz Davranışlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-200 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
                    <h3 className="text-xl font-semibold text-green-700">Olumlu Etkiler</h3>
                  </div>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Ödemeleri zamanında yapmak</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Kredi kartı borcunu asgari tutarın üzerinde ödemek</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Kredi ürünlerini düzenli ve uzun süreli kullanmak</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Kredi kartı limitinizin tamamını değil, bir kısmını kullanmak</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Otomatik ödeme talimatı vermek</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-red-200 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <XCircle className="h-6 w-6 text-red-500 mr-2" />
                    <h3 className="text-xl font-semibold text-red-700">Olumsuz Etkiler</h3>
                  </div>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Gecikmeli ya da düzensiz ödemeler</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Kredi kartı limitinin tamamını doldurmak</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Sık kredi başvurusu yapmak</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Yeni açılan kredilerde ödeme geçmişi oluşturamamak</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>İcra, haciz gibi yasal takip süreçlerine dahil olmak</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="py-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Kredi Notumu Nereden Öğrenebilirim?</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Kredi notunuzu öğrenmek için kullanabileceğiniz güvenilir yollar:
            </p>
            <div className="space-y-3">
              <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                <BadgeInfo className="text-blue-500 mr-2" size={20} />
                <p className="font-medium"><a href="https://www.findeks.com" className="text-blue-700 hover:underline">www.findeks.com</a> – Türkiye'de kredi notu sorgulamanın en yaygın ve güvenilir platformudur.</p>
              </div>
              <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                <BadgeInfo className="text-blue-500 mr-2" size={20} />
                <p className="font-medium">Mobil bankacılık uygulamaları – Pek çok banka, Findeks iş birliği ile müşterilerine not bilgisini ücretsiz sunar.</p>
              </div>
              <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                <BadgeInfo className="text-blue-500 mr-2" size={20} />
                <p className="font-medium">Yıllık ücretsiz rapor hakkı – KKB veya bazı banka kanallarından yılda 1 kez ücretsiz rapor alınabilir.</p>
              </div>
            </div>
          </div>
          
          <div className="py-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Kredi Notunu Yükseltmenin Yolları</h2>
            <div className="bg-primary-light p-6 rounded-lg">
              <ol className="list-decimal pl-6 space-y-3">
                <li className="text-lg">Ödemelerinizi her zaman zamanında yapın.</li>
                <li className="text-lg">Limitinizin tamamını değil, bir kısmını kullanın.</li>
                <li className="text-lg">Borçlarınızı yapılandırarak azaltın.</li>
                <li className="text-lg">Yeni kredi başvurularını sınırlı tutun.</li>
                <li className="text-lg">Küçük tutarlı kredi ürünleriyle düzenli ödeme geçmişi oluşturun.</li>
                <li className="text-lg">Kapanan kredilerinizi iyi durumda kapatın.</li>
              </ol>
              <p className="mt-4 text-primary-dark">
                Bu adımlar, kredi notunuzun zaman içinde istikrarlı bir şekilde artmasını sağlar.
              </p>
            </div>
          </div>
          
          <div className="py-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-primary">Sonuç: Kredi Notu, Finansal Refahın Kapısıdır</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Kredi notu, finansal sağlığınızın kısa bir özetidir. Bu puanı sadece borç almak için değil, finansal özgürlüğünüzü yönetmek için de ciddiye almalısınız.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Düzenli ödeme alışkanlığı, borç yönetimi ve disiplinli bütçe kontrolüyle kredi notunuzu güçlendirebilir, hayatınızın birçok alanında avantajlı konuma geçebilirsiniz.
            </p>
            <div className="bg-primary bg-opacity-10 p-5 rounded-lg border border-primary border-opacity-20 mt-6">
              <p className="text-lg font-medium text-primary-dark mb-2">
                Notunuzu öğrenmek ve takipte kalmak için:
              </p>
              <a 
                href="https://www.findeks.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-primary-dark hover:text-primary transition-colors text-lg font-medium"
              >
                <FileText className="mr-2" size={20} />
                www.findeks.com
              </a>
            </div>
          </div>
        </div>
      )
    }
  };

  // Find the requested blog post
  const post = slug ? blogPosts[slug] : null;
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Yazısı Bulunamadı</h1>
            <p className="text-gray-600 mb-8">Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.</p>
            <Link to="/blog">
              <Button>Blog'a Dön</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-gray-600 hover:text-primary">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <Link to="/blog" className="text-gray-600 hover:text-primary">
                      Blog
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-primary">{post.title}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                {/* Featured Image */}
                <div className="h-64 md:h-96 w-full overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                {/* Post Content */}
                <div className="p-6 md:p-8">
                  {/* Meta Information */}
                  <div className="flex items-center flex-wrap text-sm text-gray-500 mb-4">
                    <div className="flex items-center mr-6 mb-2">
                      <User size={16} className="mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center mr-6 mb-2">
                      <CalendarIcon size={16} className="mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Clock size={16} className="mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
                  
                  {/* Post Content */}
                  <article className="prose prose-lg max-w-none">
                    {post.content}
                  </article>
                </div>
                
                {/* Post Footer */}
                <div className="border-t border-gray-100 p-6 md:p-8 bg-gray-50">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <Link to="/blog">
                        <Button variant="outline" className="flex items-center">
                          <ChevronLeft size={16} className="mr-2" />
                          Blog'a Dön
                        </Button>
                      </Link>
                    </div>
                    <div className="flex space-x-2">
                      <span className="text-sm text-gray-500">Paylaş:</span>
                      <a href="#" className="text-gray-400 hover:text-primary">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-primary">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-primary">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/4">
              {/* About Author */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Yazar Hakkında</h3>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden mr-4">
                    <img src="/placeholder.svg" alt={post.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{post.author}</h4>
                    <p className="text-sm text-gray-600 mt-1">Finansal Analist & Eğitmen</p>
                  </div>
                </div>
                <p className="text-gray-600 mt-4">
                  10+ yıl finans sektörü deneyimine sahip uzman. Kredi ve bankacılık alanında birçok kuruluşta danışmanlık yapmakta ve webinarlar düzenlemekte.
                </p>
              </div>
              
              {/* Related Posts */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Benzer İçerikler</h3>
                <div className="space-y-4">
                  <Link to="/blog/hic-kredi-kullanmadim" className="block group">
                    <div className="flex items-start">
                      <div className="w-16 h-16 rounded bg-gray-100 flex-shrink-0 overflow-hidden mr-3">
                        <img src="/placeholder.svg" alt="Blog post thumbnail" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">Hiç Kredi Kullanmadım, Nasıl Kredibilite Oluşturabilirim?</h4>
                        <p className="text-sm text-gray-500 mt-1">5 Haziran 2023</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/blog/findeks-raporu-nedir" className="block group">
                    <div className="flex items-start">
                      <div className="w-16 h-16 rounded bg-gray-100 flex-shrink-0 overflow-hidden mr-3">
                        <img src="/placeholder.svg" alt="Blog post thumbnail" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">Findeks Raporu Nedir? Nasıl Yorumlanır?</h4>
                        <p className="text-sm text-gray-500 mt-1">28 Mayıs 2023</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/blog/finansal-disiplin" className="block group">
                    <div className="flex items-start">
                      <div className="w-16 h-16 rounded bg-gray-100 flex-shrink-0 overflow-hidden mr-3">
                        <img src="/placeholder.svg" alt="Blog post thumbnail" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">Finansal Disiplin: Düzenli Tasarruf ve Ödeme Alışkanlıkları</h4>
                        <p className="text-sm text-gray-500 mt-1">22 Mayıs 2023</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
