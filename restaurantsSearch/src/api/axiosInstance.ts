import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const api = axios.create({
  baseURL: 'https://site.ontopo.work/api',
})

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers['token'] = authStore.token
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default api
