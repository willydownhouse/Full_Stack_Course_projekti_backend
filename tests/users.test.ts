import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../src/app';

const api = supertest(app);

beforeAll(async () => {
  await api.post('/api/testing/reset');
  await api.post('/api/testing/init');
});

describe('USER TESTS', () => {
  test('sasa', () => {
    expect(1).toBe(1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
