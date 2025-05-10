
// Related posts service

// Related post data structure
export interface RelatedPost {
  title: string;
  slug: string;
  date: string;
  image: string;
}

// Get related posts based on current post or category
export const getRelatedPosts = (currentPostSlug?: string): RelatedPost[] => {
  // This would normally come from a database and would be actually related to the current post
  // For now we're just returning a fixed set
  const relatedPostsData: {[key: string]: RelatedPost[]} = {
    "kredi-notu-nedir": [
      {
        title: "Hiç Kredi Kullanmadım, Nasıl Kredibilite Oluşturabilirim?",
        slug: "hic-kredi-kullanmadim",
        date: "5 Haziran 2023",
        image: "/placeholder.svg"
      },
      {
        title: "Findeks Raporu Nedir? Nasıl Yorumlanır?",
        slug: "findeks-raporu-nedir",
        date: "28 Mayıs 2023",
        image: "/placeholder.svg"
      }
    ],
    "hic-kredi-kullanmadim": [
      {
        title: "Kredi Notu Nedir? Nasıl Hesaplanır?",
        slug: "kredi-notu-nedir",
        date: "10 Haziran 2023",
        image: "/placeholder.svg"
      },
      {
        title: "Gençler İçin Finansal Okuryazarlık Rehberi",
        slug: "gencler-icin-finansal-okuryazarlik",
        date: "1 Haziran 2023",
        image: "/placeholder.svg"
      }
    ],
    "gencler-icin-finansal-okuryazarlik": [
      {
        title: "Finansal Disiplin: Düzenli Tasarruf ve Ödeme Alışkanlıkları",
        slug: "finansal-disiplin",
        date: "22 Mayıs 2023",
        image: "/placeholder.svg"
      },
      {
        title: "Hiç Kredi Kullanmadım, Nasıl Kredibilite Oluşturabilirim?",
        slug: "hic-kredi-kullanmadim",
        date: "5 Haziran 2023",
        image: "/placeholder.svg"
      }
    ]
  };

  // Default related posts if no specific ones available for the current post
  const defaultRelatedPosts = [
    {
      title: "Kredi Notu Nedir? Nasıl Hesaplanır?",
      slug: "kredi-notu-nedir",
      date: "10 Haziran 2023",
      image: "/placeholder.svg"
    },
    {
      title: "Finansal Disiplin: Düzenli Tasarruf ve Ödeme Alışkanlıkları",
      slug: "finansal-disiplin",
      date: "22 Mayıs 2023",
      image: "/placeholder.svg"
    }
  ];

  // Return related posts for the current post if available, otherwise return default related posts
  return currentPostSlug && relatedPostsData[currentPostSlug] 
    ? relatedPostsData[currentPostSlug] 
    : defaultRelatedPosts;
};
