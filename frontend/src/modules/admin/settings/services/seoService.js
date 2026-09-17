const API_URL = 'http://localhost:5000/api/seo';

const getAuthHeaders = () => {
  const token = localStorage.getItem('kajo_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const seoService = {
  // Get SEO settings
  getSettings: async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch SEO settings');
      }
      return data;
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
      throw error;
    }
  },

  // Update SEO settings (Admin)
  updateSettings: async (seoData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(seoData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update SEO settings');
      }
      return data;
    } catch (error) {
      console.error('Error updating SEO settings:', error);
      throw error;
    }
  },
};
