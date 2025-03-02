import { defineStore } from 'pinia';
import axios from 'axios';
import { API_BASE_URL } from '@/config/constants';
import type { AuthState } from '@/types/authState';

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
        const response = await axios.post(API_BASE_URL + '/loginAnonymously');

        this.token = response.data.jwt_token;
        this.refreshToken = response.data.refresh_token;
      } catch (err) {
        this.error = 'Failed to log in.';
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
  // TODO: Refresh token, token expiration, etc.
});
