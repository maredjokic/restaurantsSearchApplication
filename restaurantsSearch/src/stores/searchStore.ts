import { defineStore } from 'pinia';
import api from '@/api/axiosInstance';
import { useAuthStore } from '@/stores/authStore';

interface SearchState {
  searchId: string | null;
  loading: boolean;
  error: string | null;
}

export const useSearchStore = defineStore('search', {
  state: (): SearchState => ({
    searchId: null,
    loading: false,
    error: null,
  }),

  actions: {
    async createSearchToken(date: string, time: string, size: string) {
      this.loading = true;
      this.error = null;
      const authStore = useAuthStore();
      console.log(authStore.token);
      try {
        const response = await api.post('search', {
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
      } catch (err) {
        console.log(err);
        this.error = 'Failed to create search token.';
      } finally {
        this.loading = false;
      }
    },
  },
});
