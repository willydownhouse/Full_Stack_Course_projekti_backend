import mongoose from 'mongoose';

export default interface IReview {
  id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  tripId: mongoose.Schema.Types.ObjectId;
  text: string;
  rating: number;
  createdAt: Date;
}
