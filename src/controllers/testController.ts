import Trip from '../models/tripModel';
import { Request, Response } from 'express';

export const resetDatabase = async (_: Request, res: Response) => {
  await Trip.deleteMany({});

  res.status(204).end();
};

export const initDataBase = async (_: Request, res: Response) => {
  const trips = await Trip.insertMany([
    {
      type: 'mtb',
      name: 'Finale MTB week',
      location: {
        city: 'Finale Ligure',
        country: 'Italy',
      },
      duration: 7,
      price: 399,
      maxGroupSize: 6,
      tecnicalDifficulty: 'intermediate',
      physicalDifficulty: 'hard',
      startDates: ['1/2/22', '8/2/22'],
      description: 'Seven days of hard riding in Liguria.',
    },
    {
      type: 'ski',
      name: 'Lyngen Ski week',
      location: {
        city: 'Lyngseidet',
        country: 'Norway',
      },
      duration: 7,
      price: 599,
      maxGroupSize: 6,
      tecnicalDifficulty: 'intermediate',
      physicalDifficulty: 'hard',
      startDates: ['1/3/22', '8/3/22'],
      description: 'Seven days of hard skiing in Lyngen Alps.',
    },
  ]);

  res.status(201).json(trips);
};

export default {
  resetDatabase,
  initDataBase,
};
