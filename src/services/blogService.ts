
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
  return allBlogPosts;
};

// Re-export the author and related posts functions for easy access
export { getAuthorInfo, getRelatedPosts };
export type { AuthorInfo, RelatedPost };
