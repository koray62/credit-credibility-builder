
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, Clock, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BlogPostHeaderProps {
  title: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ 
  title, author, date, readTime, image 
}) => {
  return (
    <>
      {/* Featured Image */}
      <div className="w-full overflow-hidden">
        <AspectRatio ratio={16/9}>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        </AspectRatio>
      </div>
      
      {/* Meta Information */}
      <div className="p-6 md:p-8">
        <div className="flex items-center flex-wrap text-sm text-gray-500 mb-4">
          <div className="flex items-center mr-6 mb-2">
            <User size={16} className="mr-1" />
            <span>{author}</span>
          </div>
          <div className="flex items-center mr-6 mb-2">
            <CalendarIcon size={16} className="mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center mb-2">
            <Clock size={16} className="mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{title}</h1>
      </div>
    </>
  );
};

export default BlogPostHeader;
