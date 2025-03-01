import { ref } from 'vue';
import { useSearchStore } from '@/stores/searchStore';

export function useSearch() {
  const searchStore = useSearchStore();
  const errorMessage = ref<string | null>(null);

  const searchRestaurants = async (date: string, time: string, size: number) => {
    if (!date || !time || !size) {
      errorMessage.value = 'Please fill in all fields!';
      return;
    }

    try {
      errorMessage.value = null; // Reset error state
      await searchStore.createSearchToken(
        date.replace(/-/g, ''),
        time.replace(':', ''),
        size.toString(),
      );
      await searchStore.fetchRestaurants();
    } catch (error) {
      console.log(error);
      errorMessage.value = 'An error occurred while searching.';
    }
  };

  return {
    searchRestaurants,
    error: errorMessage,
  };
}
