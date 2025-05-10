
import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPostBreadcrumbProps {
  title: string;
}

const BlogPostBreadcrumb: React.FC<BlogPostBreadcrumbProps> = ({ title }) => {
  return (
    <div className="mb-8">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="text-gray-600 hover:text-primary">
              Ana Sayfa
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link to="/blog" className="text-gray-600 hover:text-primary">
                Blog
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-primary">{title}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default BlogPostBreadcrumb;
