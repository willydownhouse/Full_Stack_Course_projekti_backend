import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../src/app';

const api = supertest(app);

let token: string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let res: any;

beforeAll(async () => {
  await api.post('/api/testing/reset');
  await api.post('/api/testing/init');

  res = await api.get('/api/trips');
});

describe('CREATE BOOKING', () => {
  beforeAll(async () => {
    const res = await api.post('/api/login').send({
      email: 'ville@test.fi',
      password: 'test1234',
    });

    token = res.body.token as string;
  });

  test('Does not work without authentication', async () => {
    const booking = await api.post('/api/bookings').send({
      trip: res.body.trips[0]._id as string,
      trip_date: '1/2/22',
    });

    expect(booking.statusCode).toBe(401);
  });
  test('Created with valid data', async () => {
    const booking = await api
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        trip: res.body.trips[0]._id as string,
        trip_date: '1/2/22',
      });

    expect(booking.statusCode).toBe(201);
  });
  test('Fails if trying to book same trip with same date again', async () => {
    const booking = await api
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        trip: res.body.trips[0]._id as string,
        trip_date: '1/2/22',
      });

    expect(booking.statusCode).toBe(400);
    expect(booking.body.message).toBe('You have already booked for this trip');
  });
  test('Fails if trip_date is not in trips startDates', async () => {
    const booking = await api
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        trip: res.body.trips[1]._id as string,
        trip_date: '1/4/22',
      });

    expect(booking.statusCode).toBe(400);
    expect(booking.body.message).toBe(
      'No trip found with that ID and trip date'
    );
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
