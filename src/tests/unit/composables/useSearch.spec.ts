import axios from 'axios';
import { setActivePinia, createPinia } from 'pinia';
import { useSearchStore } from '@/stores/searchStore';
import { useAuthStore } from '@/stores/authStore';
import { beforeEach, describe, it, expect, vi } from 'vitest';

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  };
});

describe('Search Store', () => {
  let searchStore: ReturnType<typeof useSearchStore>;
  let authStore: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    searchStore = useSearchStore();
    authStore = useAuthStore();
  });

  it('initializes with default state', () => {
    expect(searchStore.searchId).toBeNull();
    expect(searchStore.restaurants).toEqual([]);
    expect(searchStore.total).toBe(0);
    expect(searchStore.loading).toBe(false);
    expect(searchStore.error).toBeNull();
  });

  it('creates search token successfully', async () => {
    const response = {
      data: {
        search_id: '12345',
      },
    };
    (axios.post as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(() =>
      Promise.resolve(response),
    );

    await searchStore.createSearchToken('2025-03-02', '18:30', '2');

    expect(searchStore.loading).toBe(false);
    expect(searchStore.searchId).toBe('12345');
    expect(searchStore.restaurants).toEqual([]);
    expect(searchStore.error).toBeNull();
  });

  it('fails to create search token', async () => {
    (axios.post as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to create search token')),
    );

    try {
      await searchStore.createSearchToken('2025-03-02', '18:30', '2');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe('Failed to create search token');
      expect(searchStore.loading).toBe(false);
      expect(searchStore.searchId).toBeNull();
      expect(searchStore.restaurants).toEqual([]);
      expect(searchStore.error).toBe('Failed to create search token.');
    }
  });

  it('fetches restaurants successfully', async () => {
    searchStore.searchId = '12345';
    authStore.token = 'fakeToken';

    const response = {
      data: {
        posts: [
          {
            post: {
              venue_name: 'Restaurant A',
              slug: 'restaurant-a',
              score: 4.5,
            },
            availability: {
              recommended: [
                {
                  text: 'Available at 18:30',
                  time: '18:30',
                },
              ],
            },
          },
        ],
        total: 1,
      },
    };
    (axios.post as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(() =>
      Promise.resolve(response),
    );

    await searchStore.fetchRestaurants();

    expect(searchStore.loading).toBe(false);
    expect(searchStore.restaurants).toEqual([
      {
        name: 'Restaurant A',
        slug: 'restaurant-a',
        score: 4.5,
        recommended: [
          {
            text: 'Available at 18:30',
            time: '18:30',
          },
        ],
      },
    ]);
    expect(searchStore.total).toBe(1);
    expect(searchStore.error).toBeNull();
  });

  it('fails to fetch restaurants', async () => {
    searchStore.searchId = '12345';
    authStore.token = 'fakeToken';

    (axios.post as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch restaurants')),
    );

    try {
      await searchStore.fetchRestaurants();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe('Failed to fetch restaurants');
      expect(searchStore.loading).toBe(false);
      expect(searchStore.restaurants).toEqual([]);
      expect(searchStore.total).toBe(0);
      expect(searchStore.error).toBe('Failed to fetch restaurants.');
    }
  });
});
