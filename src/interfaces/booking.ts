import mongoose from 'mongoose';

export default interface IBooking {
  id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  tripId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  status: string;
}
