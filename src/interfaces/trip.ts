import mongoose from 'mongoose';
import { TLocation } from '../types/location';

export default interface ITrip {
  id: mongoose.Schema.Types.ObjectId;
  type: string;
  name: string;
  location: TLocation;
  duration: number;
  price: number;
  maxGroupSize: number;
  tecnicalDifficulty?: string;
  physicalDifficulty?: string;
  description?: string;
  numOfReviews?: number;
  reviewAverage?: number;
  mainImg?: string;
  images?: string[];
  startDates?: string[];
  active: boolean;
}
