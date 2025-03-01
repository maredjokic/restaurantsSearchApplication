import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import RestaurantList from '@/components/Restaurant/RestaurantList.vue';
import { useSearchStore } from '@/stores/searchStore';
import RestaurantCard from '@/components/Restaurant/RestaurantCard.vue';
import ProgressBar from '@/components/Loader/ProgressBar.vue';

describe('RestaurantList.vue', () => {
  let searchStore: ReturnType<typeof useSearchStore>;

  beforeEach(() => {
    // Kreiranje testne Pinia instance
    const pinia = createTestingPinia();
    searchStore = useSearchStore(pinia);
  });

  it("prikazuje ProgressBar i 'Loading...' kada je loading aktivan i nema restorana", () => {
    searchStore.loading = true;
    searchStore.restaurants = [];

    const wrapper = mount(RestaurantList, {
      global: { plugins: [createTestingPinia()] },
    });

    expect(wrapper.findComponent(ProgressBar).exists()).toBe(true);
    expect(wrapper.text()).toContain('Loading...');
  });

  it('prikazuje poruku kada nema rezultata', () => {
    searchStore.loading = false;
    searchStore.restaurants = [];

    const wrapper = mount(RestaurantList, {
      global: { plugins: [createTestingPinia()] },
    });

    expect(wrapper.text()).toContain('No restaurants found.');
  });

  it('prikazuje listu restorana ako ih ima u store-u', () => {
    searchStore.loading = false;
    searchStore.restaurants = [
      { name: 'Test Restaurant', slug: 'test-restaurant', score: 4.5, recommended: [] },
    ];

    const wrapper = mount(RestaurantList, {
      global: { plugins: [createTestingPinia()] },
    });

    expect(wrapper.findComponent(RestaurantCard).exists()).toBe(true);
    expect(wrapper.text()).toContain('Test Restaurant');
  });

  it('prikazuje grešku ako je prisutna u store-u', () => {
    searchStore.error = 'API error';

    const wrapper = mount(RestaurantList, {
      global: { plugins: [createTestingPinia()] },
    });

    expect(wrapper.text()).toContain('API error');
  });

  it("prikazuje ProgressBar i 'Loading...' kada se učitavaju dodatni podaci", () => {
    searchStore.loading = true;
    searchStore.restaurants = [
      { name: 'Test Restaurant', slug: 'test-restaurant', score: 4.5, recommended: [] },
    ];

    const wrapper = mount(RestaurantList, {
      global: { plugins: [createTestingPinia()] },
    });

    expect(wrapper.findComponent(ProgressBar).exists()).toBe(true);
    expect(wrapper.text()).toContain('Loading...');
  });
});
