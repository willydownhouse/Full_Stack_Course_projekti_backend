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

describe('CREATE REVIEW', () => {
  beforeAll(async () => {
    const res = await api.post('/api/login').send({
      email: 'ville@test.fi',
      password: 'test1234',
    });

    token = res.body.token as string;
  });

  test('Does not work without authentication', async () => {
    const review = await api.post('/api/reviews').send({
      trip: res.body.data[0]._id as string,
    });

    expect(review.statusCode).toBe(401);
  });
  test('Review created with valid data', async () => {
    const review = await api
      .post('/api/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send({
        trip: res.body.data[0]._id as string,
        rating: 4,
        text: 'Amazing',
      });

    expect(review.statusCode).toBe(201);
  });
  test('User can review same trip only once', async () => {
    const review = await api
      .post('/api/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send({
        trip: res.body.data[0]._id as string,
        rating: 4.6,
        text: 'Lets try again',
      });

    expect(review.statusCode).toBe(400);
    expect(review.body.message).toBe('You have already reviewed this trip');
  });

  test('Review not created if no rating field', async () => {
    const review = await api
      .post('/api/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send({
        trip: res.body.data[1]._id as string,
        text: 'Yeah!',
      });

    expect(review.statusCode).toBe(400);
    expect(review.body.message).toBe(
      'Review validation failed: rating: Review must have a rating'
    );
  });
  test('Review not created if no text field', async () => {
    const review = await api
      .post('/api/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send({
        trip: res.body.data[1]._id as string,
        rating: 3,
      });

    expect(review.statusCode).toBe(400);
    expect(review.body.message).toBe(
      'Review validation failed: text: Path `text` is required.'
    );
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
