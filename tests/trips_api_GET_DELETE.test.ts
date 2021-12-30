import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../src/app';

const api = supertest(app);

beforeAll(async () => {
  await api.post('/api/testing/reset');
  await api.post('/api/testing/init');
});

describe('GET REQUESTS FOR TRIPS', () => {
  test('GET all trips', async () => {
    const res = await api.get('/api/trips');

    expect(res.body.data.length).toBe(2);
    expect(res.body.data[0].name).toBe('Finale MTB week');
    expect(res.body.data[1].name).toBe('Lyngen Ski week');
  });

  test('Get one trip by ID', async () => {
    const res = await api.get('/api/trips');

    const resOneTrip = await api.get(`/api/trips/${res.body.data[0]._id}`);

    expect(resOneTrip.statusCode).toEqual(200);
    expect(resOneTrip.body.name).toBe('Finale MTB week');
  });

  test('Get one trip by ID fails with wrong ID', async () => {
    const res = await api.get(`/api/trips/4`);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Cast to ObjectId failed for value');
  });
});

describe('DELETED REQUESTS', () => {
  test('trip deleted by ID', async () => {
    const res = await api.get('/api/trips');

    const resFromDelete = await api.delete(
      `/api/trips/${res.body.data[0]._id}`
    );

    const resAfterDeleteGetAllTrips = await api.get('/api/trips');

    const resAfterDeleteGetOneTrip = await api.get(
      `/api/trips/${res.body.data[0]._id}`
    );

    expect(resAfterDeleteGetAllTrips.body.data.length).toBe(1);
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
