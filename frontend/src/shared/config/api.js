/**
 * Centralized API Base URL configuration.
 * Automatically resolves VITE_API_BASE_URL or VITE_API_URL from environment variables:
 * - Production: Defaults to relative '/api' (routed via Nginx reverse proxy to prevent ERR_CONNECTION_REFUSED on VPS)
 * - Development: Falls back to 'http://localhost:5000/api' or custom local dev setting
 */
export const resolveApiBaseUrl = (env = import.meta.env) => {
  const envUrl = env?.VITE_API_BASE_URL || env?.VITE_API_URL;

  // In production, guard against accidental localhost URLs and default to relative '/api'
  if (env?.PROD || env?.MODE === 'production') {
    if (!envUrl || envUrl.includes('localhost:5000')) {
      return '/api';
    }
    return envUrl.replace(/\/+$/, '');
  }

  // Local development fallback
  const devUrl = envUrl || 'http://localhost:5000/api';
  return devUrl.replace(/\/+$/, '');
};

// Global active API base URL stripped of trailing slashes
export const API_BASE_URL = resolveApiBaseUrl(import.meta.env);

export default API_BASE_URL;
