
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BlogCategoriesProps {
  categories: string[];
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({ categories }) => {
  return (
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
  );
};

export default BlogCategories;
