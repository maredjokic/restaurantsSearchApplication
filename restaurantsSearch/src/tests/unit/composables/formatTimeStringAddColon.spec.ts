import { describe, it, expect } from 'vitest';
import { formatTimeStringAddColon } from '@/composables/formatTimeString';

describe('formatTimeString', () => {
  it('should format valid time string correctly', () => {
    expect(formatTimeStringAddColon('1234')).toBe('12:34');
    expect(formatTimeStringAddColon('0456')).toBe('04:56');
  });

  it('should return the same string if the format is invalid', () => {
    expect(formatTimeStringAddColon('12345')).toBe('12345');
    expect(formatTimeStringAddColon('abc')).toBe('abc');
    expect(formatTimeStringAddColon('12:34')).toBe('12:34');
  });
});
