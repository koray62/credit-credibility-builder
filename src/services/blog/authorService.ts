
// Author information service

// Author data structure
export interface AuthorInfo {
  name: string;
  role?: string; // Optional role property
  bio: string;
  avatar?: string; // Optional avatar property
}

// Get author information
export const getAuthorInfo = (authorName: string): AuthorInfo => {
  // This would normally come from a database with all authors
  const authorDatabase = {
    "Koray Kaya": {
      name: "Koray Kaya",
      role: "Finans Uzmanı",
      bio: "10+ yıllık bankacılık deneyimiyle finans ve kredi sistemleri konusunda uzmanlaşmış yazar.",
      avatar: "/placeholder.svg"
    },
    "Ayşe Yılmaz": {
      name: "Ayşe Yılmaz",
      role: "Finansal Danışman",
      bio: "Kişisel finans ve bütçe yönetimi konularında danışmanlık yapan uzman yazar.",
      avatar: "/placeholder.svg"
    },
    "Mehmet Demir": {
      name: "Mehmet Demir",
      role: "Ekonomist",
      bio: "Gençlerin finansal okuryazarlığı üzerine çalışmalar yapan ekonomi yazarı.",
      avatar: "/placeholder.svg"
    },
    "Zeynep Kara": {
      name: "Zeynep Kara",
      role: "Kredi Sistemleri Uzmanı",
      bio: "Kredi raporlama sistemleri ve kredi skorlama üzerine uzmanlaşmış finans yazarı.",
      avatar: "/placeholder.svg"
    },
    "Ali Can": {
      name: "Ali Can",
      role: "Kişisel Finans Koçu",
      bio: "Bütçe yönetimi ve finansal disiplin konularında kitapları olan finans koçu.",
      avatar: "/placeholder.svg"
    },
    "Sevgi Yılmaz": {
      name: "Sevgi Yılmaz",
      role: "Toplumsal Finans Uzmanı",
      bio: "Kadınların finansal bağımsızlığı üzerine çalışmalar yapan uzman danışman.",
      avatar: "/placeholder.svg"
    }
  };

  // Return author info if found, or return a default author info
  return authorDatabase[authorName] || {
    name: authorName,
    role: "Finans Yazarı",
    bio: "Finans ve ekonomi konularında uzman yazar.",
    avatar: "/placeholder.svg"
  };
};
