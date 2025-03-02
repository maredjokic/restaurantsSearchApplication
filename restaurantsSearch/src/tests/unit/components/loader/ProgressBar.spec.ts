import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ProgressBar from '@/components/Loader/ProgressBar.vue';

describe('ProgressBar Component', () => {
  it('renders the progress bar', () => {
    const wrapper = mount(ProgressBar);

    expect(wrapper.find('.progress-container').exists()).toBe(true);
    expect(wrapper.find('.progress-bar').exists()).toBe(true);
  });
});
