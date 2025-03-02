import axios from 'axios';
import { setActivePinia, createPinia } from 'pinia';
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

describe('Auth Store', () => {
  let authStore: ReturnType<typeof useAuthStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    authStore = useAuthStore();
  });

  it('initializes with default state', () => {
    expect(authStore.token).toBeNull();
    expect(authStore.refreshToken).toBeNull();
    expect(authStore.loading).toBe(false);
    expect(authStore.error).toBeNull();
  });

  it('logs in anonymously successfully', async () => {
    const response = {
      data: {
        jwt_token: 'fakeJwtToken',
        refresh_token: 'fakeRefreshToken',
      },
    };
    (axios.post as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(response);

    await authStore.loginAnonymously();

    expect(authStore.loading).toBe(false);
    expect(authStore.token).toBe('fakeJwtToken');
    expect(authStore.refreshToken).toBe('fakeRefreshToken');
    expect(authStore.error).toBeNull();
  });

  it('fails to log in anonymously', async () => {
    (axios.post as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Failed to log in'),
    );

    try {
      await authStore.loginAnonymously();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe('Failed to log in');
      expect(authStore.loading).toBe(false);
      expect(authStore.token).toBeNull();
      expect(authStore.refreshToken).toBeNull();
      expect(authStore.error).toBe('Failed to log in.');
    }
  });
});
