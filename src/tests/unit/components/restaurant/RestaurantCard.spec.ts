import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RestaurantCard from '@/components/restaurant/RestaurantCard.vue';
import type { Restaurant } from '@/types/restaurant';

const restaurant: Restaurant = {
  name: 'Test Restaurant',
  score: 4.5,
  slug: 'test-restaurant',
  recommended: [
  ],
};

describe('RestaurantCard.vue', () => {
  it('renders RestaurantDetails and RecommendationsList components correctly', () => {
    const wrapper = mount(RestaurantCard, {
      props: {
        restaurant,
      },
    });

    const restaurantDetails = wrapper.findComponent({ name: 'RestaurantDetails' });
    expect(restaurantDetails.exists()).toBe(true);
    expect(restaurantDetails.props('restaurant')).toEqual(restaurant);

    const recommendationsList = wrapper.findComponent({ name: 'RecommendationsList' });
    expect(recommendationsList.exists()).toBe(true);
    expect(recommendationsList.props('recommendations')).toEqual(restaurant.recommended);
  });
});
