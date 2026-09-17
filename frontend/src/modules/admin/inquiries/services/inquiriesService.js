const API_URL = 'http://localhost:5000/api/inquiries';

const getAuthHeader = () => {
  const token = localStorage.getItem('kajo_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const inquiriesService = {
  // Public submit inquiry from Let's Talk page
  submit: async (inquiryData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit inquiry');
      return data.data;
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      throw err;
    }
  },

  // Admin get all inquiries
  getAll: async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          ...getAuthHeader(),
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch inquiries');
      return data.data || [];
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      throw err;
    }
  },

  // Admin get single inquiry detail
  getById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        headers: {
          ...getAuthHeader(),
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch inquiry detail');
      return data.data;
    } catch (err) {
      console.error('Error fetching inquiry detail:', err);
      throw err;
    }
  },

  // Admin update inquiry status ('new' | 'read' | 'replied' | 'archived')
  updateStatus: async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update inquiry status');
      return data.data;
    } catch (err) {
      console.error('Error updating inquiry status:', err);
      throw err;
    }
  },

  // Admin delete inquiry
  delete: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader(),
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete inquiry');
      return data;
    } catch (err) {
      console.error('Error deleting inquiry:', err);
      throw err;
    }
  },
};

export default inquiriesService;
