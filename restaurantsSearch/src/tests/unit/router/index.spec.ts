import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import SearchView from '@/views/SearchView.vue';
import { createPinia } from 'pinia';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/search',
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
  ],
});

describe('Router', () => {
  it('redirects from "/" to "/search"', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, createPinia()],
      },
    });

    router.push('/');
    await router.isReady();

    expect(wrapper.vm.$route.path).toBe('/search');
  });

  it('renders SearchView at "/search"', async () => {
    router.push('/search');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router, createPinia()],
      },
    });

    expect(wrapper.findComponent(SearchView).exists()).toBe(true);
  });
});
