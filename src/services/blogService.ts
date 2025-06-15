
import { allBlogPosts } from './blog/posts';
import { getAuthorInfo } from './blog/authorService';
import { getRelatedPosts } from './blog/relatedPostsService';
import type { AuthorInfo } from './blog/authorService';
import type { RelatedPost } from './blog/relatedPostsService';

// Re-export blog post data structure
export interface BlogPostType {
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  image: string;
}

// Get all blog posts
export const getBlogPosts = (): Record<string, BlogPostType> => {
  const updatedPosts = Object.entries(allBlogPosts).reduce((acc, [slug, post]) => {
    acc[slug] = {
      ...post,
      image: post.image === '/placeholder.svg' ? '/kredi_kredinotu_kredibilite.svg' : post.image,
    };
    return acc;
  }, {} as Record<string, BlogPostType>);

  return updatedPosts;
};

// Re-export the author and related posts functions for easy access
export { getAuthorInfo, getRelatedPosts };
export type { AuthorInfo, RelatedPost };
