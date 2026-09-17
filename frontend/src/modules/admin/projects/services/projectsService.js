const API_URL = 'http://localhost:5000/api/projects';

const getAuthHeader = () => {
  const token = localStorage.getItem('kajo_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const projectsService = {
  // Get all projects
  getAll: async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch projects');
      return data.data || [];
    } catch (err) {
      console.error('Error fetching projects:', err);
      throw err;
    }
  },

  // Get project by ID or Slug
  getByIdOrSlug: async (identifier) => {
    try {
      const res = await fetch(`${API_URL}/${identifier}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch project details');
      return data.data;
    } catch (err) {
      console.error('Error fetching project detail:', err);
      throw err;
    }
  },

  // Create new project
  create: async (projectData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(projectData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create project');
      return data.data;
    } catch (err) {
      console.error('Error creating project:', err);
      throw err;
    }
  },

  // Update existing project
  update: async (id, projectData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(projectData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update project');
      return data.data;
    } catch (err) {
      console.error('Error updating project:', err);
      throw err;
    }
  },

  // Delete project
  delete: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader(),
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete project');
      return data;
    } catch (err) {
      console.error('Error deleting project:', err);
      throw err;
    }
  },
};

export default projectsService;
