import mongoose from 'mongoose';
import supertest from 'supertest';
import testTrips from '../src/utils/testData/tripsData';

import app from '../src/app';

const api = supertest(app);

let token: string;
let token2: string;

beforeAll(async () => {
  await api.post('/api/testing/reset');
  await api.post('/api/testing/init');
});

describe('TESTS FOR CREATING A NEW TRIP', () => {
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
  test('Does not work without a token', async () => {
    const res = await api.post('/api/trips').send(testTrips.okTrip);

    expect(res.statusCode).toEqual(401);
  });
  test('Does not work if role is user', async () => {
    const res = await api
      .post('/api/trips')
      .set('Authorization', 'Bearer ' + token)
      .send(testTrips.okTrip);

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('You are not allowed to do this action');
  });
  test('New trip is created with valid data', async () => {
    const res = await api
      .post('/api/trips')
      .set('Authorization', 'Bearer ' + token2)
      .send(testTrips.okTrip);

    expect(res.statusCode).toEqual(201);
  });

  test('Fails without trip name', async () => {
    const res = await api
      .post('/api/trips')
      .set('Authorization', 'Bearer ' + token2)
      .send(testTrips.tripWithoutName);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe(
      'Trip validation failed: name: Trip must have a name'
    );
  });
  test('Fails when name type is number', async () => {
    const res = await api
      .post('/api/trips')
      .set('Authorization', 'Bearer ' + token2)
      .send(testTrips.tripNameIsNumber);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Invalid type of trip name');
  });
  test('Fails without location', async () => {
    const res = await api
      .post('/api/trips')
      .set('Authorization', 'Bearer ' + token2)
      .send(testTrips.tripWithoutLocation);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe(
      'Trip validation failed: location.city: Location must have a city, location.country: Location must have a country'
    );
  });
  test('Fails without duration', async () => {
    const res = await api
      .post('/api/trips')
      .set('Authorization', 'Bearer ' + token2)
      .send(testTrips.tripWithOutDuration);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe(
      'Trip validation failed: duration: Trip must have a duration'
    );
  });
  test('Fails with duration type is invalid (String) ', async () => {
    const res = await api
      .post('/api/trips')
      .set('Authorization', 'Bearer ' + token2)
      .send(testTrips.tripDurationIsString);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain(
      'Trip validation failed: duration: Cast to Number failed for value "halloo" (type string) at path "duration"'
    );
  });
  test('Creating trip only required properties -> default properties gets created ', async () => {
    const res = await api
      .post('/api/trips')
      .set('Authorization', 'Bearer ' + token2)
      .send(testTrips.okTripWithOnlyRequiredFields);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('tecnicalDifficulty');
    expect(res.body).toHaveProperty('physicalDifficulty');
    expect(res.body).toHaveProperty('numOfReviews');
    expect(res.body).toHaveProperty('reviewAverage');
    expect(res.body).toHaveProperty('startDates');
    expect(res.body).toHaveProperty('images');
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('updatedAt');
    expect(res.body).toHaveProperty('active');
  });

  test('Creating trip with extra properties -> extra properties are not included', async () => {
    const res = await api
      .post('/api/trips')
      .set('Authorization', 'Bearer ' + token2)
      .send(testTrips.okTripWithExtraFields);

    expect(res.statusCode).toEqual(201);
    expect(res.body).not.toHaveProperty('haloo');
    expect(res.body).not.toHaveProperty('ski');
    expect(res.body).not.toHaveProperty('ciao');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
