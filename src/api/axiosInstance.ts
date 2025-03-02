import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { API_BASE_URL } from '@/config/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers['token'] = authStore.token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
