import { describe, it, expect } from 'vitest';
import { formatDaysUntilExpiry, getStatusFromDays } from '../../src/dashboard/src/lib/utils';

describe('formatDaysUntilExpiry', () => {
  it('returns expired message for negative days', () => {
    expect(formatDaysUntilExpiry(-5)).toBe('Expired 5 days ago');
  });

  it('returns expired 1 day ago for -1', () => {
    expect(formatDaysUntilExpiry(-1)).toBe('Expired 1 day ago');
  });

  it('returns expires today for 0', () => {
    expect(formatDaysUntilExpiry(0)).toBe('Expires today');
  });

  it('returns expires tomorrow for 1', () => {
    expect(formatDaysUntilExpiry(1)).toBe('Expires tomorrow');
  });

  it('returns days for positive days', () => {
    expect(formatDaysUntilExpiry(30)).toBe('30 days');
  });
});

describe('getStatusFromDays', () => {
  it('returns expired for negative days', () => {
    expect(getStatusFromDays(-1)).toBe('expired');
  });

  it('returns expiring-soon for 0 days', () => {
    expect(getStatusFromDays(0)).toBe('expiring-soon');
  });

  it('returns expiring-soon for 14 days', () => {
    expect(getStatusFromDays(14)).toBe('expiring-soon');
  });

  it('returns healthy for 15 days', () => {
    expect(getStatusFromDays(15)).toBe('healthy');
  });

  it('returns healthy for 90 days', () => {
    expect(getStatusFromDays(90)).toBe('healthy');
  });
});
