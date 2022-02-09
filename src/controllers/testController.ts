import Trip from '../models/tripModel';
import User from '../models/userModel';
import Booking from '../models/bookingModel';
import Review from '../models/reviewModel';
import { Request, Response } from 'express';

export const resetDatabase = async (_: Request, res: Response) => {
  await Trip.deleteMany({});
  await User.deleteMany({});
  await Booking.deleteMany({});
  await Review.deleteMany({});

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

  const user1 = new User({
    email: 'ville@test.fi',
    password: 'test1234',
    confirmPassword: 'test1234',
    name: {
      first_name: 'ville',
      last_name: 'kristian',
    },
  });
  const user2 = new User({
    email: 'admin@test.fi',
    password: 'test1234',
    confirmPassword: 'test1234',
    role: 'admin',
  });
  const user3 = new User({
    email: 'kimi@test.fi',
    password: 'test1234',
    confirmPassword: 'test1234',
    role: 'admin',
  });

  await user2.save();
  await user1.save();
  await user3.save();

  res.status(201).json({
    user1,
    user2,
    trips,
  });
};

export default {
  resetDatabase,
  initDataBase,
};
