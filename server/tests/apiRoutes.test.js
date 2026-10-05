import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Public REST API Routes (Integration)', () => {
  it('GET /api/services - should return success with array response', async () => {
    const response = await request(app).get('/api/services');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('GET /api/projects - should return success with array response', async () => {
    const response = await request(app).get('/api/projects');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('GET /api/team - should return success with array response', async () => {
    const response = await request(app).get('/api/team');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('GET /api/blogs - should return success with array response', async () => {
    const response = await request(app).get('/api/blogs');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('GET /api/reviews - should return success with array response', async () => {
    const response = await request(app).get('/api/reviews');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('GET /api/seo - should return success with data object', async () => {
    const response = await request(app).get('/api/seo');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(typeof response.body.data).toBe('object');
  });
});
