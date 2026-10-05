import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('API Server Health & Routing (Integration)', () => {
  it('GET /api/health - should return status 200 with service info', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('service', 'Stackline Studio Backend API');
    expect(response.body).toHaveProperty('timestamp');
  });

  it('GET /api/non-existent-route - should return 404 with standard error format', async () => {
    const response = await request(app).get('/api/random-unknown-endpoint');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'Route not found',
    });
  });
});
