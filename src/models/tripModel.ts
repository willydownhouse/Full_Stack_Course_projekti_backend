import mongoose, { Schema } from 'mongoose';
import ITrip from '../interfaces/trip';
import uniqueValidator from 'mongoose-unique-validator';

const tripSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: {
        values: ['ski', 'mtb', 'paragliding'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Trip must have a type'],
    },
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
      enum: {
        values: ['easy', 'intermediate', 'hard', 'extreme'],
        message: '{VALUE} is not supported',
      },
      default: 'intermediate',
    },
    physicalDifficulty: {
      type: String,
      enum: {
        values: ['easy', 'intermediate', 'hard', 'extreme'],
        message: '{VALUE} is not supported',
      },
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
      type: [String],
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

tripSchema.plugin(uniqueValidator);

export default mongoose.model<ITrip>('Trip', tripSchema);
