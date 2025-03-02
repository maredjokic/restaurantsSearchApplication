import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthIndicator from '@/components/Header/AuthIndicator.vue';
import ProgressBar from '@/components/Loader/ProgressBar.vue';
import { useAuthStore } from '@/stores/authStore';
import { createPinia } from 'pinia';

export const piniaInstance = createPinia();

// Mock the useAuthStore composable
vi.mock('@/stores/authStore', () => {
  return {
    useAuthStore: vi.fn().mockReturnValue({
      loading: false,
      error: null,
      token: null,
      loginAnonymously: vi.fn(),
    }),
  };
});

describe('AuthIndicator Component', () => {
  let authStore: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    authStore = useAuthStore();
  });

  it('renders correctly when loading is false, error is null, and token is null', () => {
    const wrapper = mount(AuthIndicator, {
      global: {
        components: {
          ProgressBar,
        },
      },
    });

    expect(wrapper.findComponent(ProgressBar).exists()).toBe(false);
    expect(wrapper.text()).not.toContain('Logging in...');
    expect(wrapper.text()).not.toContain(authStore.error);
    expect(wrapper.text()).not.toContain('Logged in with token!');
  });

  it('displays loading state correctly', async () => {
    authStore.loading = true;
    const wrapper = mount(AuthIndicator, {
      global: {
        components: {
          ProgressBar,
        },
      },
    });

    expect(wrapper.findComponent(ProgressBar).exists()).toBe(true);
    expect(wrapper.text()).toContain('Logging in...');
  });

  it('calls loginAnonymously method on button click', async () => {
    const wrapper = mount(AuthIndicator, {
      global: {
        components: {
          ProgressBar,
        },
      },
    });

    await wrapper.find('button').trigger('click');

    expect(authStore.loginAnonymously).toHaveBeenCalled();
  });
});
