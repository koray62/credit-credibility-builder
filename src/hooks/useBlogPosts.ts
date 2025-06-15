import { useState, useEffect } from 'react';
import { BlogPostCardProps } from '@/components/blog/BlogPostCard';
import { getBlogPosts, BlogPostType } from '@/services/blogService';

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostCardProps[]>([
    {
      title: "Kredi Hesaplama Nasıl Yapılır? Detaylı Rehber",
      excerpt: "Kredi ödemelerinizi doğru hesaplamak için bilmeniz gereken her şey. Aylık taksit, faiz oranları ve ara ödemelerle ilgili detaylı bilgiler.",
      author: "Koray Kaya",
      date: "14 Haziran 2025",
      readTime: "10 dk okuma",
      image: "/lovable-uploads/3e11d1e1-ba6a-424b-a89d-f42c51439d1e.png",
      slug: "kredi-hesaplama-rehberi",
      featured: true
    },
    {
      title: "Kredi Notu Nedir? Nasıl Hesaplanır?",
      excerpt: "Kredi notu, bankalardan kredi alırken en önemli faktörlerden biridir. Peki nasıl hesaplanır ve nasıl yükseltilir?",
      author: "Koray Kaya",
      date: "10 Haziran 2023",
      readTime: "8 dk okuma",
      image: "/lovable-uploads/1504fd32-c631-406e-9b20-7132a95a8bc1.png",
      slug: "kredi-notu-nedir",
      featured: false
    },
    {
      title: "Hiç Kredi Kullanmadım, Nasıl Kredibilite Oluşturabilirim?",
      excerpt: "Hiç kredi kullanmadıysanız veya uzun süredir kredi kullanmıyorsanız, SkorUp ile finansal sisteme entegre olmanın yolları.",
      author: "Ayşe Yılmaz",
      date: "5 Haziran 2023",
      readTime: "5 dk okuma",
      image: "/lovable-uploads/65caeb40-2ffd-4d59-a62c-797362e58e08.png",
      slug: "hic-kredi-kullanmadim",
      featured: false
    },
    {
      title: "Gençler İçin Finansal Okuryazarlık Rehberi",
      excerpt: "Finansal hayata yeni başlayan gençler için temel finansal kavramlar ve akıllı para yönetimi ipuçları.",
      author: "Mehmet Demir",
      date: "1 Haziran 2023",
      readTime: "8 dk okuma",
      image: "/lovable-uploads/854c0b51-a423-4186-a3b3-29fc77616400.png",
      slug: "gencler-icin-finansal-okuryazarlik"
    },
    {
      title: "Findeks Raporu Nedir? Nasıl Yorumlanır?",
      excerpt: "Findeks raporu, finansal sağlığınızın röntgeni gibidir. Bu içerikte Findeks raporunuzu nasıl yorumlayacağınızı ve Risk Raporunuzda hatalı bilgiler olması durumunda neler yapabililir?",
      author: "Zeynep Kara",
      date: "28 Mayıs 2023",
      readTime: "7 dk okuma",
      image: "/kredi_kredinotu_kredibilite.svg",
      slug: "findeks-raporu-nedir"
    },
    {
      title: "Finansal Disiplin: Düzenli Tasarruf ve Ödeme Alışkanlıkları",
      excerpt: "Finansal disiplini nasıl sağlarsınız? Düzenli tasarruf ve ödeme alışkanlıkları oluşturmanın püf noktaları.",
      author: "Ali Can",
      date: "22 Mayıs 2023",
      readTime: "6 dk okuma",
      image: "/kredi_kredinotu_kredibilite.svg",
      slug: "finansal-disiplin"
    },
    {
      title: "Ev Hanımları İçin Kredi Puanı Oluşturma Rehberi",
      excerpt: "Ev hanımlarının kendi adlarına kredi puanı oluşturarak finansal özgürlüklerini artırma yolları.",
      author: "Sevgi Yılmaz",
      date: "15 Mayıs 2023",
      readTime: "5 dk okuma",
      image: "/kredi_kredinotu_kredibilite.svg",
      slug: "ev-hanimlari-icin-rehber"
    }
  ]);

  const categories = [
    "Kredi Puanı",
    "Finansal Okuryazarlık",
    "Tasarruf İpuçları",
    "Kredibilite",
    "Bankacılık",
    "Findeks"
  ];

  return {
    blogPosts,
    categories
  };
};
