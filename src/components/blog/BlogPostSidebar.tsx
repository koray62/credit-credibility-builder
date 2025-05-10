
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthorInfo, RelatedPost } from '../../services/blogService';

interface BlogPostSidebarProps {
  author: AuthorInfo;
  relatedPosts: RelatedPost[];
}

const BlogPostSidebar: React.FC<BlogPostSidebarProps> = ({ author, relatedPosts }) => {
  return (
    <div className="lg:w-1/4">
      {/* About Author */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6">
        <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Yazar Hakkında</h3>
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden mr-4">
            <img src={author.avatar || "/placeholder.svg"} alt={author.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{author.name}</h4>
            {author.role && <p className="text-sm text-gray-600 mt-1">{author.role}</p>}
          </div>
        </div>
        <p className="text-gray-600 mt-4">{author.bio}</p>
      </div>
      
      {/* Related Posts */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Benzer İçerikler</h3>
        <div className="space-y-4">
          {relatedPosts.map((post, index) => (
            <Link key={index} to={`/blog/${post.slug}`} className="block group">
              <div className="flex items-start">
                <div className="w-16 h-16 rounded bg-gray-100 flex-shrink-0 overflow-hidden mr-3">
                  <img src={post.image} alt="Blog post thumbnail" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostSidebar;
