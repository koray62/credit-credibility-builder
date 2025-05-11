
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, User, ChevronRight } from 'lucide-react';

export interface BlogPostCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  featured?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ 
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

export default BlogPostCard;
