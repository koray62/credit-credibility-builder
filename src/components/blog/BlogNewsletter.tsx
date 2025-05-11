
import React from 'react';
import { Button } from "@/components/ui/button";

const BlogNewsletter: React.FC = () => {
  return (
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
  );
};

export default BlogNewsletter;
