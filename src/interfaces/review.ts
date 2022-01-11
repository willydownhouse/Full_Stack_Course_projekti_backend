import mongoose from 'mongoose';

export default interface IReview {
  id: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  trip: mongoose.Schema.Types.ObjectId;
  text: string;
  rating: number;
  createdAt: Date;
}
