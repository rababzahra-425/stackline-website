import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../modules/admin/auth/services/authService';
import { blogService } from '../modules/admin/blog/services/blogService';
import { projectsService } from '../modules/admin/projects/services/projectsService';
import { teamService } from '../modules/admin/team/services/teamService';
import { API_BASE_URL } from '../shared/config/api';

global.fetch = vi.fn();

describe('Frontend Service Modules (Unit & Mock Integration)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('authService.signup - should call POST /api/auth/signup with payload', async () => {
    const mockData = { success: true, message: 'User registered' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await authService.signup('Test User', 'test@example.com', 'password123');

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/auth/signup`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Test User', email: 'test@example.com', password: 'password123' }),
      })
    );
    expect(result).toEqual(mockData);
  });

  it('blogService.getAll - should call GET /api/blogs', async () => {
    const mockBlogs = { success: true, data: [{ _id: '1', title: 'Test Post' }] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBlogs,
    });

    const result = await blogService.getAll();

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/blogs`
    );
    expect(result).toEqual(mockBlogs);
  });

  it('projectsService.getAll - should call GET /api/projects', async () => {
    const mockProjects = { success: true, data: [{ _id: '101', title: 'Kanba' }] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects,
    });

    const result = await projectsService.getAll();

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/projects`
    );
    expect(result).toEqual(mockProjects.data);
  });

  it('teamService.getAll - should call GET /api/team', async () => {
    const mockTeam = { success: true, data: [{ memberId: '01', name: 'Alex' }] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTeam,
    });

    const result = await teamService.getAll();

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/team`
    );
    expect(result).toEqual(mockTeam.data);
  });
});
