
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, User, ChevronRight } from 'lucide-react';

interface BlogPostProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  featured?: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({ 
  title, excerpt, author, date, readTime, image, slug, featured = false 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md ${
      featured ? 'border-2 border-primary' : 'border border-gray-100'
    }`}>
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
        {featured && (
          <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
            Öne Çıkan
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <div className="flex items-center mr-4">
            <User size={14} className="mr-1" />
            <span>{author}</span>
          </div>
          <div className="flex items-center mr-4">
            <CalendarIcon size={14} className="mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
        
        <p className="text-gray-600 mb-4">{excerpt}</p>
        
        <Link to={`/blog/${slug}`}>
          <Button variant="ghost" className="text-primary hover:text-primary-dark hover:bg-primary-light px-0">
            Devamını Oku <ChevronRight size={16} className="ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Blog: React.FC = () => {
  // Örnek blog yazıları
  const blogPosts = [
    {
      title: "Kredi Notu Nedir? Nasıl Hesaplanır?",
      excerpt: "Kredi notu, bankalardan kredi alırken en önemli faktörlerden biridir. Peki nasıl hesaplanır ve nasıl yükseltilir?",
      author: "Koray Kaya",
      date: "10 Haziran 2023",
      readTime: "6 dk okuma",
      image: "/placeholder.svg",
      slug: "kredi-notu-nedir",
      featured: true
    },
    {
      title: "Hiç Kredi Kullanmadım, Nasıl Kredibilite Oluşturabilirim?",
      excerpt: "Hiç kredi kullanmadıysanız veya uzun süredir kredi kullanmıyorsanız, finansal sisteme entegre olmanın yolları.",
      author: "Ayşe Yılmaz",
      date: "5 Haziran 2023",
      readTime: "5 dk okuma",
      image: "/placeholder.svg",
      slug: "hic-kredi-kullanmadim"
    },
    {
      title: "Gençler İçin Finansal Okuryazarlık Rehberi",
      excerpt: "Finansal hayata yeni başlayan gençler için temel finansal kavramlar ve akıllı para yönetimi ipuçları.",
      author: "Mehmet Demir",
      date: "1 Haziran 2023",
      readTime: "8 dk okuma",
      image: "/placeholder.svg",
      slug: "gencler-icin-finansal-okuryazarlik"
    },
    {
      title: "Findeks Raporu Nedir? Nasıl Yorumlanır?",
      excerpt: "Findeks raporunuzdaki verileri doğru bir şekilde yorumlamak ve kredi puanınızı yükseltmek için püf noktaları.",
      author: "Zeynep Kara",
      date: "28 Mayıs 2023",
      readTime: "7 dk okuma",
      image: "/placeholder.svg",
      slug: "findeks-raporu-nedir"
    },
    {
      title: "Finansal Disiplin: Düzenli Tasarruf ve Ödeme Alışkanlıkları",
      excerpt: "Finansal disiplini nasıl sağlarsınız? Düzenli tasarruf ve ödeme alışkanlıkları oluşturmanın püf noktaları.",
      author: "Ali Can",
      date: "22 Mayıs 2023",
      readTime: "6 dk okuma",
      image: "/placeholder.svg",
      slug: "finansal-disiplin"
    },
    {
      title: "Ev Hanımları İçin Kredi Puanı Oluşturma Rehberi",
      excerpt: "Ev hanımlarının kendi adlarına kredi puanı oluşturarak finansal özgürlüklerini artırma yolları.",
      author: "Sevgi Yılmaz",
      date: "15 Mayıs 2023",
      readTime: "5 dk okuma",
      image: "/placeholder.svg",
      slug: "ev-hanimlari-icin-rehber"
    }
  ];

  // Kategori listesi
  const categories = [
    "Kredi Puanı",
    "Finansal Okuryazarlık",
    "Tasarruf İpuçları",
    "Kredibilite",
    "Bankacılık",
    "Findeks"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kredi, finansal okuryazarlık ve kredibilite oluşturma konularında bilgilendirici yazılar ve ipuçları.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Ana İçerik */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post, index) => (
                  <BlogPost
                    key={index}
                    title={post.title}
                    excerpt={post.excerpt}
                    author={post.author}
                    date={post.date}
                    readTime={post.readTime}
                    image={post.image}
                    slug={post.slug}
                    featured={post.featured}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <nav className="inline-flex">
                  <a href="#" className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                    Önceki
                  </a>
                  <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-primary text-white">
                    1
                  </a>
                  <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                    2
                  </a>
                  <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                    3
                  </a>
                  <a href="#" className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                    Sonraki
                  </a>
                </nav>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/4">
              {/* Arama */}
              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 mb-6">
                <h3 className="text-lg font-semibold mb-4">Arama</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Blog yazılarında ara..." 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Kategoriler */}
              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 mb-6">
                <h3 className="text-lg font-semibold mb-4">Kategoriler</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="flex items-center justify-between text-gray-600 hover:text-primary transition-colors"
                      >
                        <span>{category}</span>
                        <ChevronRight size={16} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Haber Bülteni */}
              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Haber Bülteni</h3>
                <p className="text-gray-600 mb-4">
                  En yeni blog yazılarımızdan ve güncellemelerimizden haberdar olmak için abone olun.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="E-posta adresiniz" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                    Abone Ol
                  </Button>
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

export default Blog;
