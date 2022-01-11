import mongoose, { Schema } from 'mongoose';
import IBooking from '../interfaces/booking';

const bookingSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  trip_date: {
    type: String,
    required: [true, 'Booking must have a  trip date'],
  },
  createdAt: {
    type: Date,
    required: [true, 'Booking must have a date'],
  },
  status: {
    type: String,
    enum: {
      values: ['booked', 'paid', 'cancelled'],
      message: '{VALUE} is not supported',
    },
    default: 'booked',
  },
});

export default mongoose.model<IBooking>('Booking', bookingSchema);
