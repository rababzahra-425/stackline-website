/**
 * Centralized API Base URL configuration.
 * Automatically resolves VITE_API_URL from environment variables,
 * defaulting to http://localhost:5000/api for local development.
 */
const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Strip any trailing slashes to keep endpoint strings clean
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

export default API_BASE_URL;
