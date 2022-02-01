import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../src/app';

const api = supertest(app);

beforeAll(async () => {
  await api.post('/api/testing/reset');
  await api.post('/api/testing/init');
});

let token: string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let resTrips: any;
let id: string;

describe('USER REVIEWS', () => {
  beforeAll(async () => {
    const res = await api.post('/api/login').send({
      email: 'ville@test.fi',
      password: 'test1234',
    });

    id = res.body.user;

    resTrips = await api.get('/api/trips');

    token = res.body.token as string;

    // CREATE REVIEW
    await api
      .post('/api/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send({
        trip: resTrips.body.trips[0]._id as string,
        text: 'Aivan loistava retki!',
        rating: 4.9,
      });
  });
  test('User gets his/hers reviews', async () => {
    const res = await api.get(`/api/reviews?user=${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.reviews).toHaveLength(1);
    expect(res.body.reviews[0].user.name.first_name).toBe('ville');
    expect(res.body.reviews[0].user.name.last_name).toBe('kristian');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
