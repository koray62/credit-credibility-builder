
import React from 'react';

const BlogPagination: React.FC = () => {
  return (
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
  );
};

export default BlogPagination;
