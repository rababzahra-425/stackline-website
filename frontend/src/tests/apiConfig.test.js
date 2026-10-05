import { describe, it, expect } from 'vitest';
import { API_BASE_URL } from '../shared/config/api';

describe('Frontend API Configuration (Unit)', () => {
  it('should define API_BASE_URL cleanly without trailing slash', () => {
    expect(API_BASE_URL).toBeDefined();
    expect(typeof API_BASE_URL).toBe('string');
    expect(API_BASE_URL.endsWith('/')).toBe(false);
  });

  it('should include /api path structure', () => {
    expect(API_BASE_URL).toMatch(/\/api$/);
  });
});
