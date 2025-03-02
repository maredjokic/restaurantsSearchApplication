import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const authStore = useAuthStore();

  onMounted(() => {
    if (!authStore.token) {
      authStore.loginAnonymously();
    }
  });
}
