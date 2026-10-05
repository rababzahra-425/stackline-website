import { API_BASE_URL } from '@/shared/config/api';

const API_URL = `${API_BASE_URL}/team`;

const getAuthHeader = () => {
  const token = localStorage.getItem('kajo_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const teamService = {
  // Get all team members
  getAll: async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch team members');
      return data.data || [];
    } catch (err) {
      console.error('Error fetching team members:', err);
      throw err;
    }
  },

  // Get team member by ID
  getById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch team member');
      return data.data;
    } catch (err) {
      console.error('Error fetching team member:', err);
      throw err;
    }
  },

  // Create new team member
  create: async (memberData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(memberData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create team member');
      return data.data;
    } catch (err) {
      console.error('Error creating team member:', err);
      throw err;
    }
  },

  // Update existing team member
  update: async (id, memberData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(memberData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update team member');
      return data.data;
    } catch (err) {
      console.error('Error updating team member:', err);
      throw err;
    }
  },

  // Delete team member
  delete: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader(),
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete team member');
      return data;
    } catch (err) {
      console.error('Error deleting team member:', err);
      throw err;
    }
  },
};

export default teamService;
