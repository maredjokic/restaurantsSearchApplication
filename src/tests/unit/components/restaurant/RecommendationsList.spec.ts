import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { formatTimeStringAddColon } from '@/composables/formatTimeString';
import RecommendationsList from '@/components/restaurant/RecommendationsList.vue'; // prilagodite putanju

const recommendations = [
  { text: 'Recommendation 1', time: '1200' },
  { text: 'Recommendation 2', time: '1230' },
];

describe('RecommendationsList.vue', () => {
  it('renders recommendations correctly', () => {
    const wrapper = mount(RecommendationsList, {
      props: {
        recommendations,
      },
    });

    const items = wrapper.findAll('.recommendation-item');
    expect(items.length).toBe(recommendations.length);

    items.forEach((item, index) => {
      const formattedTime = formatTimeStringAddColon(recommendations[index].time);
      expect(item.text()).toContain(formattedTime);
      expect(item.text()).toContain(recommendations[index].text);
    });
  });
});
