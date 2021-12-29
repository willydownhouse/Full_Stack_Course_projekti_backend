import mongoose, { Schema } from 'mongoose';
import ITrip from '../interfaces/trip';
import uniqueValidator from 'mongoose-unique-validator';

const tripSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Trip must have a name'],
      unique: true,
    },
    location: {
      country: {
        type: String,
        required: [true, 'Location must have a country'],
      },
      city: {
        type: String,
        required: [true, 'Location must have a city'],
      },
    },
    duration: {
      type: Number,
      required: [true, 'Trip must have a duration'],
    },
    price: {
      type: Number,
      required: [true, 'Trip must have a price'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Trip must have a max groupsize'],
      min: 3,
      max: 6,
    },
    tecnicalDifficulty: {
      type: String,
      enum: ['easy', 'intermediate', 'hard', 'extreme'],
      default: 'intermediate',
    },
    physicalDifficulty: {
      type: String,
      enum: ['easy', 'intermediate', 'hard', 'extreme'],
      default: 'intermediate',
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviewAverage: {
      type: Number,
      default: 4.5,
    },
    mainImg: {
      type: String,
    },
    images: {
      type: [String],
    },
    startDates: {
      type: [Date],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
tripSchema.plugin(uniqueValidator);

export default mongoose.model<ITrip>('Trip', tripSchema);
