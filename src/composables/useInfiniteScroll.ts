
import { onMounted, onBeforeUnmount } from 'vue';
import { useSearchStore } from '@/stores/searchStore';

export function useInfiniteScroll() {
  const searchStore = useSearchStore();

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      if (!searchStore.loading) {
        searchStore.fetchRestaurants();
      }
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
}
