import { describe, it, expect } from 'vitest';
import { useTimeOptions } from '@/composables/useTimeOptions';

describe('useTimeOptions', () => {
  it('should return an array of time slots from 12:00 to 20:00', () => {
    const { timeOptions } = useTimeOptions();
    expect(timeOptions.length).toBe(9);
    expect(timeOptions[0]).toBe('12:00');
    expect(timeOptions[timeOptions.length - 1]).toBe('20:00');
  });
});
