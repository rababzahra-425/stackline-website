/**
 * Centralized API Base URL configuration.
 * Automatically resolves VITE_API_BASE_URL or VITE_API_URL from environment variables:
 * - Production: Defaults to relative '/api' (routed via Nginx reverse proxy to prevent ERR_CONNECTION_REFUSED on VPS)
 * - Development: Falls back to 'http://localhost:5000/api' or custom local dev setting
 */
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;

  // In production, guard against accidental localhost URLs and default to relative '/api'
  if (import.meta.env.PROD || import.meta.env.MODE === 'production') {
    if (!envUrl || envUrl.includes('localhost:5000')) {
      return '/api';
    }
    return envUrl;
  }

  // Local development fallback
  return envUrl || 'http://localhost:5000/api';
};

const rawApiUrl = getApiBaseUrl();

// Strip any trailing slashes to keep endpoint strings clean
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

export default API_BASE_URL;
