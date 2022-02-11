import Booking from '../models/bookingModel';
import IBooking from '../interfaces/booking';
import Trip from '../models/tripModel';
import ITrip from '../interfaces/trip';
import { Request, Response } from 'express';
import { checkedReqBody, checkBookingReqBody } from '../typeguards/booking';
import {
  sendConfirmationEmailToCustomer,
  //sendEmailAboutNewBookingToAdmin,
} from '../utils/email';
import config from '../utils/config';

const getAllForLoggedInUser = async (req: Request, res: Response) => {
  const bookings: IBooking[] = await Booking.find({ user: req.user?.id })
    .populate('user', 'name email -_id')
    .populate('trip', 'name price -_id')
    .sort('-createdAt');

  return res.status(200).json({
    docs: bookings.length,
    bookings,
  });
};

const getAll = async (req: Request, res: Response) => {
  const bookings: IBooking[] = await Booking.find(req.query)
    .populate('user', 'name email -_id')
    .populate('trip', 'name -_id');

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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { trip, trip_date }: checkedReqBody = checkBookingReqBody(req.body);

  const tripExists: ITrip | null = await Trip.findOne({
    _id: trip,
    startDates: trip_date,
  });

  if (!tripExists) {
    return res.status(400).json({
      status: 'fail',
      message: 'No trip found with that ID and trip date',
    });
  }

  const alreadyBookedForThisTrip: IBooking | null = await Booking.findOne({
    trip: trip,
    user: req.user?.id,
    trip_date,
  });

  if (alreadyBookedForThisTrip) {
    return res.status(400).json({
      status: 'fail',
      message:
        'You have already booked this trip with this date, please choose another trip or date',
    });
  }

  const booking: IBooking = await Booking.create({
    user: req.user?.id,
    trip,
    trip_date,
    createdAt: new Date().toISOString(),
    status: 'booked',
  });

  if (config.NODE_ENV === 'development') {
    // MAILTRAP
    await sendConfirmationEmailToCustomer(
      req.user?.email as string,
      tripExists.name,
      trip_date
    );
  }

  // if (config.NODE_ENV === 'production') {
  //   await sendEmailAboutNewBookingToAdmin(
  //     'adventure_buddy@outlook.com',
  //     req.user?.email as string,
  //     tripExists.name,
  //     trip_date
  //   );
  // }

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
const deleteMyBooking = async (req: Request, res: Response) => {
  const booking: IBooking | null = await Booking.findById({
    _id: req.params.id,
  });

  if (!booking) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  if (booking.user == req.user?.id) {
    await Booking.deleteOne({ _id: req.params.id });

    return res.status(204).end();
  }

  return res.status(401).json({
    status: 'fail',
    message: 'You can only delete your own bookings',
  });
};

export default {
  getAll,
  getOne,
  create,
  update,
  deleteBooking,
  deleteMyBooking,
  getAllForLoggedInUser,
};
