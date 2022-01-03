import mongoose from 'mongoose';

export default interface IBooking {
  userId: mongoose.Schema.Types.ObjectId;
  tripId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  status: string;
}
