import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HeaderBar from '@/components/header/HeaderBar.vue';
import AuthIndicator from '@/components/header/AuthIndicator.vue';
import { createPinia } from 'pinia';

export const piniaInstance = createPinia();

describe('HeaderBar Component', () => {
  it('renders AuthIndicator component and logo image', () => {
    const wrapper = mount(HeaderBar, {
      global: {
        plugins: [piniaInstance],
      },
    });

    expect(wrapper.findComponent(AuthIndicator).exists()).toBe(true);
    expect(wrapper.find('img').attributes('alt')).toBe('my-logo');
  });
});
