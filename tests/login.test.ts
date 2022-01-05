import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../src/app';

const api = supertest(app);

beforeAll(async () => {
  await api.post('/api/testing/reset');
  await api.post('/api/testing/init');
});

describe('Login tests', () => {
  test('Login succeeded with valid credentials', async () => {
    await api.post('/api/signup').send({
      email: 'fanni@test.fi',
      password: 'test1234',
      confirmPassword: 'test1234',
    });

    const res = await api.post('/api/login').send({
      email: 'fanni@test.fi',
      password: 'test1234',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
  test('Login fails with email that not exist', async () => {
    const res = await api.post('/api/login').send({
      email: 'keke@test.fi',
      password: 'test1234',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Wrong email or password');
  });
  test('Login fails with wrong password', async () => {
    const res = await api.post('/api/login').send({
      email: 'ville@test.fi',
      password: 'test123',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Wrong email or password');
  });
  test('Login fails without password', async () => {
    const res = await api.post('/api/login').send({
      email: 'ville@test.fi',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Please insert your password');
  });
  test('Login fails without email', async () => {
    const res = await api.post('/api/login').send({
      password: 'fdsfdsf',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Please insert your email');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
