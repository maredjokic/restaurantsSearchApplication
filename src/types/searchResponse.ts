import type { Recommended } from './restaurant';

export interface SearchResponsePost {
  post: {
    venue_name: string;
    slug: string;
    score: number;
  };
  availability: {
    recommended: Recommended[];
  };
}

export interface SearchResponse {
  posts: SearchResponsePost[];
  total: number;
}
