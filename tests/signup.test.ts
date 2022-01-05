import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../src/app';

const api = supertest(app);

beforeAll(async () => {
  await api.post('/api/testing/reset');
  await api.post('/api/testing/init');
});

describe('Sign up tests', () => {
  test('Sign up succeeded with valid credentials', async () => {
    const res = await api.post('/api/signup').send({
      email: 'kimi@email.fi',
      password: 'test1234',
      confirmPassword: 'test1234',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('kimi@email.fi');
  });
  test('Sign up fails with invalid email', async () => {
    const res = await api.post('/api/signup').send({
      email: 'invalid.fi',
      password: 'test1234',
      confirmPassword: 'test1234',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('User validation failed: email');
  });
  test('Sign up fails with email that already exists', async () => {
    const res = await api.post('/api/signup').send({
      email: 'ville@test.fi',
      password: 'test1234',
      confirmPassword: 'test1234',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      'User validation failed: email: Error, expected `email` to be unique. Value: `ville@test.fi`'
    );
  });
  test('Sign up fails if passwords are not the same', async () => {
    const res = await api.post('/api/signup').send({
      email: 'keke@test.fi',
      password: 'test123',
      confirmPassword: 'test1234',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('Passwords are not the same');
  });
  test('Sign up fails if passwords are too short', async () => {
    const res = await api.post('/api/signup').send({
      email: 'keke@test.fi',
      password: 'test1',
      confirmPassword: 'test1',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain(
      'Password must be at least 6 characters'
    );
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
