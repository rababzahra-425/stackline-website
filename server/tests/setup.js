import { beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
process.env.NODE_ENV = 'test';

beforeAll(async () => {
  // Global test setup
  process.env.NODE_ENV = 'test';
});

afterAll(async () => {
  // Gracefully close any open Mongoose connections after test execution
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});
