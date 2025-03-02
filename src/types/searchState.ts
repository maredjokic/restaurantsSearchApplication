import type { Restaurant } from './restaurant';

export interface SearchState {
  searchId: string | null;
  restaurants: Restaurant[];
  total: number;
  loading: boolean;
  error: string | null;
}
