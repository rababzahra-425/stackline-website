import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient, getApiBaseUrl, API_BASE_URL } from '../api/apiClient';

describe('Frontend API Client (Unit & Configuration)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getApiBaseUrl', () => {
    it('should default to relative /api when no environment variables are defined', () => {
      const baseUrl = getApiBaseUrl({});
      expect(baseUrl).toBe('/api');
    });

    it('should respect VITE_API_BASE_URL when provided', () => {
      const baseUrl = getApiBaseUrl({
        VITE_API_BASE_URL: '/api',
      });
      expect(baseUrl).toBe('/api');
    });

    it('should strip trailing slash from base URL', () => {
      const baseUrl = getApiBaseUrl({
        VITE_API_BASE_URL: '/api/',
      });
      expect(baseUrl).toBe('/api');
    });

    it('should respect custom or full URL if configured', () => {
      const baseUrl = getApiBaseUrl({
        VITE_API_BASE_URL: 'http://localhost:5000/api',
      });
      expect(baseUrl).toBe('http://localhost:5000/api');
    });

    it('should fall back to VITE_API_URL if VITE_API_BASE_URL is absent', () => {
      const baseUrl = getApiBaseUrl({
        VITE_API_URL: '/custom/api',
      });
      expect(baseUrl).toBe('/custom/api');
    });
  });

  describe('apiClient instance', () => {
    it('should define baseURL property', () => {
      expect(apiClient.baseURL).toBeDefined();
      expect(typeof apiClient.baseURL).toBe('string');
      expect(apiClient.baseURL.endsWith('/')).toBe(false);
    });

    it('should define defaults.baseURL property', () => {
      expect(apiClient.defaults.baseURL).toBe(apiClient.baseURL);
    });

    it('apiClient.get - should dispatch fetch with correct URL', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [] }),
      });

      const res = await apiClient.get('/services');

      expect(global.fetch).toHaveBeenCalledWith(
        `${apiClient.baseURL}/services`,
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(res).toEqual({ success: true, data: [] });
    });
  });
});
