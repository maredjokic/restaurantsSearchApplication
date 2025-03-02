import { ref } from 'vue';
import { useSearchStore } from '@/stores/searchStore';

export function useSearch() {
  const searchStore = useSearchStore();
  const errorMessage = ref<string | null>(null);

  const searchRestaurants = async (
    date: string | null | undefined,
    time: string | null | undefined,
    size: number | null | undefined,
  ) => {
    if (!date || !time || !size) {
      errorMessage.value = 'Please fill in all fields!';
      return;
    }

    try {
      errorMessage.value = null;
      await searchStore.createSearchToken(
        date.replace(/-/g, ''),
        time.replace(':', ''),
        size.toString(),
      );
      await searchStore.fetchRestaurants();
    } catch (error) {
      errorMessage.value = 'An error occurred while searching.';
      throw error;
    }
  };

  return {
    searchRestaurants,
    error: errorMessage,
  };
}
