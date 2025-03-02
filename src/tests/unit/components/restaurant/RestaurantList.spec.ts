import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RestaurantList from '@/components/restaurant/RestaurantList.vue';
import RestaurantCard from '@/components/restaurant/RestaurantCard.vue';
import ProgressBar from '@/components/loader/ProgressBar.vue';
import { useSearchStore } from '@/stores/searchStore';
import type { Restaurant } from '@/types/restaurant';

vi.mock('@/stores/searchStore', () => {
  return {
    useSearchStore: vi.fn().mockReturnValue({
      loading: false,
      error: null,
      restaurants: [] as Restaurant[],
      searchId: null,
    }),
  };
});

describe('RestaurantList Component', () => {
  let searchStore: ReturnType<typeof useSearchStore>;

  beforeEach(() => {
    searchStore = useSearchStore();
  });

  it('renders initial state message', () => {
    const wrapper = mount(RestaurantList, {
      global: {
        components: {
          RestaurantCard,
          ProgressBar,
        },
      },
    });

    expect(wrapper.text()).toContain('Start your search to see results!');
  });

  it('renders error message when there is an error', () => {
    searchStore.error = 'An error occurred';
    const wrapper = mount(RestaurantList, {
      global: {
        components: {
          RestaurantCard,
          ProgressBar,
        },
      },
    });

    expect(wrapper.text()).toContain('An error occurred');
  });

  it('renders loading state when initial loading', () => {
    searchStore.loading = true;
    const wrapper = mount(RestaurantList, {
      global: {
        components: {
          RestaurantCard,
          ProgressBar,
        },
      },
    });

    expect(wrapper.findComponent(ProgressBar).exists()).toBe(true);
    expect(wrapper.text()).toContain('Loading...');
  });

  it('renders loading state when fetching more', () => {
    searchStore.loading = true;
    searchStore.restaurants = [
      { name: 'Restaurant A', slug: 'restaurant-a', score: 4.5, recommended: [] },
    ] as Restaurant[];
    const wrapper = mount(RestaurantList, {
      global: {
        components: {
          RestaurantCard,
          ProgressBar,
        },
      },
    });

    expect(wrapper.findComponent(ProgressBar).exists()).toBe(true);
    expect(wrapper.text()).toContain('Loading...');
  });
});
