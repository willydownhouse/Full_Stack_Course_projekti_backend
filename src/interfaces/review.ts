import mongoose from 'mongoose';

export default interface IReview {
  userId: mongoose.Schema.Types.ObjectId;
  tripId: mongoose.Schema.Types.ObjectId;
  text: string;
  rating: number;
  createdAt: Date;
}
