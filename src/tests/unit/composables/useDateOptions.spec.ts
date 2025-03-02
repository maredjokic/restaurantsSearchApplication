import { describe, it, expect } from 'vitest';
import { useDateOptions } from '@/composables/useDateOptions';

describe('useDateOptions', () => {
  it('should return an array of dates for the next 7 days by default', () => {
    const { dateOptions } = useDateOptions();
    expect(dateOptions.length).toBe(7);
    expect(dateOptions[0]).toBe(new Date().toISOString().split('T')[0]);
  });

  it('should return an array of dates for the next N days when passed', () => {
    const { dateOptions } = useDateOptions(3);
    expect(dateOptions.length).toBe(3);
  });
});
