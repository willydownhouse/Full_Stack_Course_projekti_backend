import Booking from '../models/bookingModel';
import IBooking from '../interfaces/booking';
import Trip from '../models/tripModel';
import ITrip from '../interfaces/trip';
import { Request, Response } from 'express';

const getAll = async (req: Request, res: Response) => {
  const bookings: IBooking[] = await Booking.find(req.query);

  res.status(200).json({
    docs: bookings.length,
    bookings,
  });
};
const getOne = async (req: Request, res: Response) => {
  const booking: IBooking | null = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  return res.status(200).json(booking);
};
const create = async (req: Request, res: Response) => {
  if (!req.body.tripId) {
    return res.status(401).json({
      status: 'fail',
      message: 'Please choose a trip for your booking',
    });
  }

  const trip: ITrip | null = await Trip.findById(req.body.tripId);

  if (!trip) {
    return res.status(400).json({
      status: 'fail',
      message: 'No trip with that ID',
    });
  }

  const alreadyBookedForThisTrip: IBooking | null = await Booking.findOne({
    tripId: trip.id,
    userId: req.user?.id,
  });

  if (alreadyBookedForThisTrip) {
    return res.status(400).json({
      status: 'fail',
      message: 'You have already booking for this trip',
    });
  }

  const booking: IBooking = await Booking.create({
    userId: req.user?.id,
    status: 'booked',
    createdAt: new Date().toISOString(),
    tripId: trip.id,
  });

  return res.status(201).json(booking);
};
const update = async (req: Request, res: Response) => {
  const booking: IBooking | null = await Booking.findByIdAndUpdate(
    { _id: req.params.id },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!booking) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }
  return res.status(200).json(booking);
};
const deleteBooking = async (req: Request, res: Response) => {
  const booking: IBooking | null = await Booking.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!booking) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  return res.status(204).end();
};

export default {
  getAll,
  getOne,
  create,
  update,
  deleteBooking,
};
