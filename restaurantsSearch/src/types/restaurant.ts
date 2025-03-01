export interface Recommended {
  text: string;
  time: string;
}

export interface Restaurant {
  name: string;
  slug: string;
  score: number;
  recommended: Recommended[];
}
