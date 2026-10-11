/**
 * Frontend API Client Configuration
 *
 * Automatically resolves the base URL:
 * - Uses import.meta.env.VITE_API_BASE_URL or import.meta.env.VITE_API_URL if configured.
 * - Defaults to relative '/api' for production and Nginx reverse proxy routing.
 * - Strips any trailing slashes to guarantee clean endpoint string formatting.
 */

export const getApiBaseUrl = (env = import.meta.env) => {
  const envUrl = env?.VITE_API_BASE_URL || env?.VITE_API_URL;

  // In production or when explicitly configured for production mode,
  // guard against accidental localhost:5000 addresses and default to relative '/api'
  const isProd = env?.PROD || env?.MODE === 'production';
  if (isProd && (!envUrl || envUrl.includes('localhost:5000'))) {
    return '/api';
  }

  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }

  // Default to relative '/api' for production, Nginx reverse proxy, and standard routing
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl(import.meta.env);

/**
 * Lightweight API client helper (Axios / Fetch compatible structure)
 */
export const apiClient = {
  baseURL: API_BASE_URL,
  defaults: {
    baseURL: API_BASE_URL,
  },

  async request(endpoint, options = {}) {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('kajo_token') : null;
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseURL}${cleanEndpoint}`;

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  },

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  },
};

export default apiClient;
