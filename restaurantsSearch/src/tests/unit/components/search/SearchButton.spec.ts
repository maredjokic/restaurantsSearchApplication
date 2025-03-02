import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import SearchButton from '@/components/Search/SearchButton.vue';

describe('LoadingButton Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(SearchButton, {
      props: {
        onClick: vi.fn(),
        loading: false,
      },
    });

    expect(wrapper.text()).toBe('Find');
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined();
  });

  it('renders loading state', () => {
    const wrapper = mount(SearchButton, {
      props: {
        onClick: vi.fn(),
        loading: true,
      },
    });

    expect(wrapper.text()).toBe('Finding...');
    expect(wrapper.find('button').attributes('disabled')).toBe('');
  });

  it('emits onClick event when clicked', async () => {
    const onClick = vi.fn();
    const wrapper = mount(SearchButton, {
      props: {
        onClick,
        loading: false,
      },
    });

    await wrapper.find('button').trigger('click');

    expect(onClick).toHaveBeenCalled();
  });
});
