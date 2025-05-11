
import React from 'react';

const BlogSearch: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 mb-6">
      <h3 className="text-lg font-semibold mb-4">Arama</h3>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Blog yazılarında ara..." 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BlogSearch;
