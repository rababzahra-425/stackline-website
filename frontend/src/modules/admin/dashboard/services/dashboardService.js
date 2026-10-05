import { API_BASE_URL } from '@/shared/config/api';

const API_URL = `${API_BASE_URL}/dashboard`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('kajo_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const dashboardService = {
  // Get aggregated dashboard statistics
  getStats: async () => {
    try {
      const response = await fetch(`${API_URL}/stats`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch dashboard statistics');
      }
      return data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
};
