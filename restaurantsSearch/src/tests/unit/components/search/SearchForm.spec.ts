import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchForm from '@/components/search/SearchForm.vue';
import GuestSelector from '@/components/search/GuestSelector.vue';
import DateSelector from '@/components/search/DateSelector.vue';
import TimeSelector from '@/components/search/TimeSelector.vue';
import SearchButton from '@/components/search/SearchButton.vue';

vi.mock('@/stores/searchStore', () => {
  return {
    useSearchStore: vi.fn().mockReturnValue({
      loading: false,
    }),
  };
});

vi.mock('@/composables/useSearch', () => {
  return {
    useSearch: vi.fn().mockReturnValue({
      searchRestaurants: vi.fn(),
      error: vi.fn(),
    }),
  };
});

describe('SearchForm Component', () => {
  beforeEach(() => {});

  it('renders correctly', () => {
    const wrapper = mount(SearchForm, {
      global: {
        components: {
          GuestSelector,
          DateSelector,
          TimeSelector,
          SearchButton,
        },
      },
    });

    expect(wrapper.findComponent(GuestSelector).exists()).toBe(true);
    expect(wrapper.findComponent(DateSelector).exists()).toBe(true);
    expect(wrapper.findComponent(TimeSelector).exists()).toBe(true);
    expect(wrapper.findComponent(SearchButton).exists()).toBe(true);
  });
});
