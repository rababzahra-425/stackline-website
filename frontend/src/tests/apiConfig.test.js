import { describe, it, expect } from 'vitest';
import { API_BASE_URL, resolveApiBaseUrl } from '../shared/config/api';

describe('Frontend API Configuration (Unit & Environment Resolution)', () => {
  it('should define API_BASE_URL cleanly without trailing slash', () => {
    expect(API_BASE_URL).toBeDefined();
    expect(typeof API_BASE_URL).toBe('string');
    expect(API_BASE_URL.endsWith('/')).toBe(false);
  });

  it('should include /api path structure', () => {
    expect(API_BASE_URL).toMatch(/\/api$/);
  });

  describe('resolveApiBaseUrl - Production Environment (VPS / Nginx)', () => {
    it('should default to relative /api in production when no env is provided', () => {
      const prodUrl = resolveApiBaseUrl({ PROD: true });
      expect(prodUrl).toBe('/api');
    });

    it('should default to relative /api when MODE is production', () => {
      const prodUrl = resolveApiBaseUrl({ MODE: 'production' });
      expect(prodUrl).toBe('/api');
    });

    it('should guard against accidental localhost:5000 URLs in production and return /api', () => {
      const prodUrl = resolveApiBaseUrl({
        PROD: true,
        VITE_API_URL: 'http://localhost:5000/api',
      });
      expect(prodUrl).toBe('/api');
    });

    it('should accept relative /api in production and strip trailing slash', () => {
      const prodUrl = resolveApiBaseUrl({
        PROD: true,
        VITE_API_BASE_URL: '/api/',
      });
      expect(prodUrl).toBe('/api');
    });
  });

  describe('resolveApiBaseUrl - Base URL & Environment Configuration', () => {
    it('should default to relative /api when no env vars are defined', () => {
      const defaultUrl = resolveApiBaseUrl({});
      expect(defaultUrl).toBe('/api');
    });

    it('should respect custom VITE_API_BASE_URL when configured', () => {
      const customUrl = resolveApiBaseUrl({
        VITE_API_BASE_URL: 'http://localhost:5000/api/',
      });
      expect(customUrl).toBe('http://localhost:5000/api');
    });

    it('should respect custom VITE_API_URL when configured', () => {
      const customUrl = resolveApiBaseUrl({
        VITE_API_URL: 'http://127.0.0.1:5000/api',
      });
      expect(customUrl).toBe('http://127.0.0.1:5000/api');
    });
  });
});
