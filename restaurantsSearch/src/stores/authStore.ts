import { defineStore } from 'pinia';
import axios from 'axios';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    refreshToken: null,
    loading: false,
    error: null,
  }),

  actions: {
    async loginAnonymously() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post('https://site.ontopo.work/api/loginAnonymously');

        this.token = response.data.jwt_token;
        this.refreshToken = response.data.refresh_token;
      } catch (err) {
        console.log(err);
        this.error = 'Failed to log in.';
      } finally {
        this.loading = false;
      }
    },
  },
});
