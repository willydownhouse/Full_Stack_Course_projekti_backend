import mongoose, { Schema } from 'mongoose';
import IBooking from '../interfaces/booking';

const bookingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trip',
    required: true,
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
  },
});

export default mongoose.model<IBooking>('Booking', bookingSchema);
