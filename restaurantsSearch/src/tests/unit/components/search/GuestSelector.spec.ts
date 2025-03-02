import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import GuestSelector from '@/components/Search/GuestSelector.vue';

describe('GuestSelector.vue', () => {
  it('should render the select element', () => {
    const wrapper = mount(GuestSelector);

    const select = wrapper.find('select');
    expect(select.exists()).toBe(true);
  });

  it('should render 10 options in the select element', () => {
    const wrapper = mount(GuestSelector);

    const options = wrapper.findAll('option');
    expect(options).toHaveLength(11); // 10 options plus default disabled option
  });

  it('should have a default disabled option with "People" label', () => {
    const wrapper = mount(GuestSelector);

    const defaultOption = wrapper.find('option:disabled');
    expect(defaultOption.text()).toBe('People');
  });
});
