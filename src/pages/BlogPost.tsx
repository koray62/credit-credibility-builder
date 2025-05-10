
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogPostHeader from '../components/blog/BlogPostHeader';
import BlogPostFooter from '../components/blog/BlogPostFooter';
import BlogPostSidebar from '../components/blog/BlogPostSidebar';
import BlogPostBreadcrumb from '../components/blog/BlogPostBreadcrumb';
import NotFoundContent from '../components/blog/NotFoundContent';
import { getBlogPosts, getRelatedPosts, getAuthorInfo } from '../services/blogService';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Get blog posts data
  const blogPosts = getBlogPosts();
  
  // Find the requested blog post
  const post = slug ? blogPosts[slug] : null;
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <NotFoundContent />
        </main>
        <Footer />
      </div>
    );
  }

  // Get author info and related posts
  const authorInfo = getAuthorInfo(post.author);
  const relatedPosts = getRelatedPosts(slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <BlogPostBreadcrumb title={post.title} />
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                {/* Post Header */}
                <BlogPostHeader 
                  title={post.title}
                  author={post.author}
                  date={post.date}
                  readTime={post.readTime}
                  image={post.image}
                />
                
                {/* Post Content */}
                <div className="p-6 md:p-8">
                  <article className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
                
                {/* Post Footer */}
                <BlogPostFooter />
              </div>
            </div>
            
            {/* Sidebar */}
            <BlogPostSidebar 
              author={authorInfo} 
              relatedPosts={relatedPosts} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
