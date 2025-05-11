
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogPostCard from '../components/blog/BlogPostCard';
import BlogSearch from '../components/blog/BlogSearch';
import BlogCategories from '../components/blog/BlogCategories';
import BlogNewsletter from '../components/blog/BlogNewsletter';
import BlogPagination from '../components/blog/BlogPagination';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Blog: React.FC = () => {
  const { blogPosts, categories } = useBlogPosts();

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
                  <BlogPostCard
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
              <BlogPagination />
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/4">
              {/* Arama */}
              <BlogSearch />
              
              {/* Kategoriler */}
              <BlogCategories categories={categories} />
              
              {/* Haber Bülteni */}
              <BlogNewsletter />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
