import { API_BASE_URL } from '@/shared/config/api';

const API_URL = `${API_BASE_URL}/services`;

const getAuthHeader = () => {
  const token = localStorage.getItem('kajo_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const servicesService = {
  // Get all services
  getAll: async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch services');
      return data.data || [];
    } catch (err) {
      console.error('Error fetching services:', err);
      throw err;
    }
  },

  // Create new service
  create: async (serviceData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(serviceData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create service');
      return data.data;
    } catch (err) {
      console.error('Error creating service:', err);
      throw err;
    }
  },

  // Update existing service
  update: async (id, serviceData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(serviceData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update service');
      return data.data;
    } catch (err) {
      console.error('Error updating service:', err);
      throw err;
    }
  },

  // Delete service
  delete: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader(),
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete service');
      return data;
    } catch (err) {
      console.error('Error deleting service:', err);
      throw err;
    }
  },
};

export default servicesService;
