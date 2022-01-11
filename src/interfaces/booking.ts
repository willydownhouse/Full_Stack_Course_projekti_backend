import mongoose from 'mongoose';

export default interface IBooking {
  id: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  trip: mongoose.Schema.Types.ObjectId;
  trip_date: string;
  createdAt: Date;
  status: string;
}
