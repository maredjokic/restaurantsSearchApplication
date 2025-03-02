import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchForm from '@/components/Search/SearchForm.vue';
import GuestSelector from '@/components/Search/GuestSelector.vue';
import DateSelector from '@/components/Search/DateSelector.vue';
import TimeSelector from '@/components/Search/TimeSelector.vue';
import SearchButton from '@/components/Search/SearchButton.vue';

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
