import { defineStore } from 'pinia';
import api from '@/api/axiosInstance';
import { useAuthStore } from '@/stores/authStore';
import type { SearchState } from '@/types/searchState';
import type { SearchResponsePost } from '@/types/searchResponse';

export const useSearchStore = defineStore('search', {
  state: (): SearchState => ({
    searchId: null,
    restaurants: [],
    total: 0,
    loading: false,
    error: null,
  }),

  actions: {
    async createSearchToken(date: string, time: string, size: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.post('search_token', {
          criteria: {
            date,
            time,
            size,
          },
          marketplace_id: '15380287',
          locale: 'en',
          geocodes: ['belgrade'],
        });

        this.searchId = response.data.search_id;
        this.restaurants = [];
      } catch (err) {
        console.log(err);
        this.error = 'Failed to create search token.';
      } finally {
        this.loading = false;
      }
    },

    async fetchRestaurants() {
      if (!this.searchId) {
        this.error = 'Search ID is not set.';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const authStore = useAuthStore();
        const response = await api.post(
          '/search_request',
          {
            search_id: this.searchId,
          },
          {
            headers: { token: authStore.token },
          },
        );

        this.restaurants.push(
          ...response.data.posts.map((post: SearchResponsePost) => ({
            name: post.post.venue_name,
            slug: post.post.slug,
            score: post.post.score,
            recommended: post.availability.recommended.map((rec) => ({
              text: rec.text,
              time: rec.time,
            })),
          })),
        );

        this.total = response.data.total;
      } catch (err) {
        console.log(err);
        this.error = 'Failed to fetch restaurants.';
      } finally {
        this.loading = false;
      }
    },
  },
});
