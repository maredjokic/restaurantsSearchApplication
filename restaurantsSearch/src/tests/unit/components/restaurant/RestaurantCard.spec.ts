import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RestaurantCard from '@/components/restaurant/RestaurantCard.vue';
import { formatTimeStringAddColon } from '@/composables/formatTimeString';
import type { Restaurant } from '@/types/restaurant';

describe('RestaurantCard.vue', () => {
  const mockRestaurant: Restaurant = {
    name: 'Test Restaurant',
    slug: 'test-restaurant',
    score: 4.5,
    recommended: [
      { text: 'Dinner', time: '1900' },
      { text: 'Lunch', time: '1200' },
    ],
  };

  it('renders correctly', () => {
    const wrapper = mount(RestaurantCard, {
      props: { restaurant: mockRestaurant },
    });

    expect(wrapper.find('.restaurant-name').text()).toBe('Test Restaurant');

    expect(wrapper.find('.restaurant-score').text()).toContain('4.50');
  });

  it('formats time correctly', () => {
    expect(formatTimeStringAddColon('1900')).toBe('19:00');
    expect(formatTimeStringAddColon('1200')).toBe('12:00');
  });

  it('displays recommended times correctly', () => {
    const wrapper = mount(RestaurantCard, {
      props: { restaurant: mockRestaurant },
    });

    const buttons = wrapper.findAll('.recommendation-item');

    expect(buttons.length).toBe(2);

    expect(buttons[0].text()).toContain('19:00 - Dinner');
    expect(buttons[1].text()).toContain('12:00 - Lunch');
  });
});
