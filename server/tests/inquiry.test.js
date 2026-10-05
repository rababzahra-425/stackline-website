import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('Inquiries API & Validation (Integration)', () => {
  it('POST /api/inquiries - should fail validation when name is missing', async () => {
    const response = await request(app).post('/api/inquiries').send({
      email: 'client@example.com',
      message: 'Looking for branding services.',
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Name is required');
  });

  it('POST /api/inquiries - should fail validation when email is missing', async () => {
    const response = await request(app).post('/api/inquiries').send({
      name: 'John Doe',
      message: 'Looking for branding services.',
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Email address is required');
  });

  it('POST /api/inquiries - should fail validation when message is missing', async () => {
    const response = await request(app).post('/api/inquiries').send({
      name: 'John Doe',
      email: 'john@example.com',
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Message content is required');
  });
});
