import Trip from '../models/tripModel';
import ITrip from '../interfaces/trip';
import { Request, Response } from 'express';
import { typeChecksToReqBody } from '../typeguards/trip';

const getAllTrips = async (_: Request, res: Response) => {
  const trips: ITrip[] = await Trip.find();

  res.status(200).json({
    docs: trips.length,
    data: trips,
  });
};

const getOneTrip = async (req: Request, res: Response) => {
  const trip: ITrip | null = await Trip.findById({ _id: req.params.id });

  if (!trip) {
    res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  res.status(200).json(trip);
};

const createTrip = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const checkedReqBody = typeChecksToReqBody(req.body);

  const trip: ITrip = await Trip.create(checkedReqBody);

  res.status(201).json(trip);
};

const updateTrip = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const checkedReqBody = typeChecksToReqBody(req.body);

  const trip: ITrip | null = await Trip.findByIdAndUpdate(
    { _id: req.params.id },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    checkedReqBody,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!trip) {
    res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }
  res.status(200).json(trip);
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

  res.status(204).end();
};

export default {
  getAllTrips,
  createTrip,
  deleteTrip,
  getOneTrip,
  updateTrip,
};
