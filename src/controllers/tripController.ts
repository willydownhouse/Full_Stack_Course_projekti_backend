import Trip from '../models/tripModel';
import ITrip from '../interfaces/trip';
import { Request, Response } from 'express';
//import { newTrip } from '../types/tripFields';
//import { toNewTrip } from '../typeguards/newTrip';

const getAllTrips = async (_: Request, res: Response) => {
  const trips: ITrip[] = await Trip.find();

  res.status(200).json({
    docs: trips.length,
    data: trips,
  });
};

const createTrip = async (req: Request, res: Response) => {
  console.log(req.body);

  //const newTrip: newTrip = toNewTrip(req.body);

  const trip: ITrip = await Trip.create(req.body);

  res.status(201).json(trip);
};

const deleteTrip = async (req: Request, res: Response) => {
  const trip: ITrip | null = await Trip.findByIdAndDelete({
    _id: req.params.id,
  });

  if (!trip) {
    res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  res.status(200).end();
};

export default {
  getAllTrips,
  createTrip,
  deleteTrip,
};
