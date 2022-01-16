import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../src/app';

const api = supertest(app);

let token: string;
let token2: string;

beforeAll(async () => {
  await api.post('/api/testing/reset');
  await api.post('/api/testing/init');
});

describe('GET REQUESTS FOR TRIPS', () => {
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

  test('GET all trips', async () => {
    const res = await api.get('/api/trips');

    expect(res.body.trips.length).toBe(2);
    expect(res.body.trips[0].name).toBe('Finale MTB week');
    expect(res.body.trips[1].name).toBe('Lyngen Ski week');
  });

  test('Get one trip by ID', async () => {
    const res = await api.get('/api/trips');

    const resOneTrip = await api.get(`/api/trips/${res.body.trips[0]._id}`);

    expect(resOneTrip.statusCode).toEqual(200);
    expect(resOneTrip.body.name).toBe('Finale MTB week');
  });

  test('Get one trip by ID fails with wrong ID', async () => {
    const res = await api.get(`/api/trips/4`);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Cast to ObjectId failed for value');
  });
});

describe('DELETE REQUESTS FOR TRIPS', () => {
  test('trip can not be deleted without token', async () => {
    const res = await api.get('/api/trips');

    const resFromDelete = await api.delete(
      `/api/trips/${res.body.trips[0]._id}`
    );

    expect(resFromDelete.statusCode).toEqual(401);
  });
  test('trip can not be deleted if role is user', async () => {
    const res = await api.get('/api/trips');

    const resFromDelete = await api
      .delete(`/api/trips/${res.body.trips[0]._id}`)
      .set('Authorization', 'Bearer ' + token);

    expect(resFromDelete.statusCode).toEqual(401);
    expect(resFromDelete.body.message).toBe(
      'You are not allowed to do this action'
    );
  });
  test('trip deleted by ID', async () => {
    const res = await api.get('/api/trips');

    const resFromDelete = await api
      .delete(`/api/trips/${res.body.trips[0]._id}`)
      .set('Authorization', 'Bearer ' + token2);

    const resAfterDeleteGetAllTrips = await api.get('/api/trips');

    const resAfterDeleteGetOneTrip = await api.get(
      `/api/trips/${res.body.trips[0]._id}`
    );

    expect(resAfterDeleteGetAllTrips.body.trips.length).toBe(1);
    expect(resFromDelete.statusCode).toEqual(204);
    expect(resAfterDeleteGetOneTrip.statusCode).toEqual(400);
    expect(resAfterDeleteGetOneTrip.body.message).toBe(
      'No document with that ID'
    );
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
