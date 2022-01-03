import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../src/app';

const api = supertest(app);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let res: any;

beforeAll(async () => {
  await api.post('/api/testing/reset');
  await api.post('/api/testing/init');

  res = await api.get('/api/trips');
});

describe('TESTS FOR UPDATING A TRIP', () => {
  test('Trip name gets updated', async () => {
    const updatedTrip = await api
      .patch(`/api/trips/${res.body.data[0]._id}`)
      .send({
        name: 'Trip name gets updated',
      });

    expect(updatedTrip.statusCode).toEqual(200);
    expect(updatedTrip.body.name).toBe('Trip name gets updated');
  });

  test('Updating fails with invalid name type (number)', async () => {
    const updatedTrip = await api
      .patch(`/api/trips/${res.body.data[0]._id}`)
      .send({
        name: 423423,
      });

    expect(updatedTrip.statusCode).toEqual(400);
    expect(updatedTrip.body.message).toBe('Invalid type of trip name');
  });
  test('Updating only the properties that trip model include', async () => {
    const updatedTrip = await api
      .patch(`/api/trips/${res.body.data[0]._id}`)
      .send({
        name: 'Dont update properties that does not exist',
        duration: 777,
        hei: ['tere'],
        ciao: 34,
        tere: 'moro',
      });

    expect(updatedTrip.statusCode).toEqual(200);
    expect(updatedTrip.body).not.toHaveProperty('hei');
    expect(updatedTrip.body).not.toHaveProperty('ciao');
    expect(updatedTrip.body).not.toHaveProperty('tere');
    expect(updatedTrip.body.name).toBe(
      'Dont update properties that does not exist'
    );
    expect(updatedTrip.body.duration).toEqual(777);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
