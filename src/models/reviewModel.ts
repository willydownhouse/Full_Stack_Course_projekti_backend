import mongoose, { Schema } from 'mongoose';
import IReview from '../interfaces/review';

const reviewSchema = new Schema({
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
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Review must have a rating'],
  },
  createdAt: {
    type: Date,
    required: [true, 'Review must have a date'],
  },
});

export default mongoose.model<IReview>('Review', reviewSchema);
