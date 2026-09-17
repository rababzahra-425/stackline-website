const API_URL = 'http://localhost:5000/api/reviews';

const getAuthHeaders = () => {
  const token = localStorage.getItem('kajo_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const reviewsService = {
  // Get all reviews (approved for public, or all for admin)
  getAll: async (includeAll = false) => {
    try {
      const url = includeAll ? `${API_URL}?all=true` : API_URL;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch reviews');
      }
      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  // Get single review by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch review details');
      }
      return data;
    } catch (error) {
      console.error(`Error fetching review ${id}:`, error);
      throw error;
    }
  },

  // Create review (Customer submission or Admin)
  create: async (reviewData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(reviewData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create review');
      }
      return data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  // Update review (Admin)
  update: async (id, reviewData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(reviewData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update review');
      }
      return data;
    } catch (error) {
      console.error(`Error updating review ${id}:`, error);
      throw error;
    }
  },

  // Delete review (Admin)
  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete review');
      }
      return data;
    } catch (error) {
      console.error(`Error deleting review ${id}:`, error);
      throw error;
    }
  },
};
