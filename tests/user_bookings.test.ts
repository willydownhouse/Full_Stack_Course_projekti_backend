import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../src/app';

const api = supertest(app);

beforeAll(async () => {
  await api.post('/api/testing/reset');
  await api.post('/api/testing/init');
});

let booking1: any;

describe('User bookings', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let resTrips: any;
  let id: string;
  let token: string;
  beforeAll(async () => {
    const res = await api.post('/api/login').send({
      email: 'ville@test.fi',
      password: 'test1234',
    });

    id = res.body.user;

    resTrips = await api.get('/api/trips');

    token = res.body.token as string;

    // CREATE TWO BOOKINGS FOR USER ville@test.fi
    booking1 = await api
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        trip: resTrips.body.trips[0]._id as string,
        trip_date: '1/2/22',
      });
    await api
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        trip: resTrips.body.trips[1]._id as string,
        trip_date: '1/3/22',
      });
  });
  test('Logged in user gets his/hers bookings', async () => {
    const res = await api
      .get(`/api/users/${id}/bookings`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.bookings).toHaveLength(2);
    expect(res.body.bookings[0].user.email).toBe('ville@test.fi');
    expect(res.body.bookings[0].trip.name).toBe('Lyngen Ski week');
  });
  test('Fails if not logged in', async () => {
    const res = await api.get(`/api/users/${id}/bookings`);

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Please login to get access');
  });
});

describe('Delete bookings', () => {
  let token: string;
  beforeAll(async () => {
    const res = await api.post('/api/login').send({
      email: 'kimi@test.fi',
      password: 'test1234',
    });

    token = res.body.token as string;
  });
  test('Fails if trying to delete other users booking', async () => {
    const res = await api
      .delete(`/api/bookings/${booking1.body._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('You can only delete your own bookings');
  });
});
describe('Delete bookings', () => {
  let token: string;
  beforeAll(async () => {
    const res = await api.post('/api/login').send({
      email: 'ville@test.fi',
      password: 'test1234',
    });

    token = res.body.token as string;
  });
  test('OK if trying to delete your own booking', async () => {
    const res = await api
      .delete(`/api/bookings/${booking1.body._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
