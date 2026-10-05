import { API_BASE_URL } from '@/shared/config/api';

const API_URL = `${API_BASE_URL}/blogs`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('kajo_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const blogService = {
  // Get all blog posts (published for public, or all for admin)
  getAll: async (includeAll = false, category = '', search = '') => {
    try {
      const params = new URLSearchParams();
      if (includeAll) params.append('all', 'true');
      if (category) params.append('category', category);
      if (search) params.append('search', search);

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await fetch(`${API_URL}${queryString}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch blog posts');
      }
      return data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  // Get single blog post by slug or ID
  getBySlugOrId: async (slugOrId) => {
    try {
      const response = await fetch(`${API_URL}/${slugOrId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch blog post details');
      }
      return data;
    } catch (error) {
      console.error(`Error fetching blog ${slugOrId}:`, error);
      throw error;
    }
  },

  // Create new blog post (Admin)
  create: async (blogData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(blogData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create blog post');
      }
      return data;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  },

  // Update blog post (Admin)
  update: async (id, blogData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(blogData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update blog post');
      }
      return data;
    } catch (error) {
      console.error(`Error updating blog ${id}:`, error);
      throw error;
    }
  },

  // Delete blog post (Admin)
  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete blog post');
      }
      return data;
    } catch (error) {
      console.error(`Error deleting blog ${id}:`, error);
      throw error;
    }
  },
};
