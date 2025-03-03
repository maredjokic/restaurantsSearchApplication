import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RestaurantDetails from '@/components/restaurant/RestaurantCard.vue';
import type { Restaurant } from '@/types/restaurant';

const restaurant: Restaurant = {
  name: 'Test Restaurant',
  score: 4.5,
  slug: 'test-restaurant',
  recommended: [],
};

describe('RestaurantDetails.vue', () => {
  it('renders restaurant details correctly', () => {
    const wrapper = mount(RestaurantDetails, {
      props: {
        restaurant,
      },
    });

    const name = wrapper.find('.restaurant-name');
    const score = wrapper.find('.restaurant-score');

    expect(name.text()).toBe('Test Restaurant');
    expect(score.text()).toBe('Score: (4.50)');
  });
});
