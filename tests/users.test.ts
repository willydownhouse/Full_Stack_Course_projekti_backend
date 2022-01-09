import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../src/app';

const api = supertest(app);

beforeAll(async () => {
  await api.post('/api/testing/reset');
  await api.post('/api/testing/init');
});

let token: string;
let token2: string;

describe('USER TESTS', () => {
  beforeAll(async () => {
    const res = await api.post('/api/login').send({
      email: 'ville@test.fi',
      password: 'test1234',
    });
    const res2 = await api.post('/api/login').send({
      email: 'admin@test.fi',
      password: 'test1234',
    });

    token = res.body.token as string;
    token2 = res2.body.token as string;
  });
  test('Cant get users if role is user', async () => {
    const res = await api
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(401);
  });
  test('Admin access users', async () => {
    const res = await api
      .get('/api/users')
      .set('Authorization', `Bearer ${token2}`);

    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(2);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
