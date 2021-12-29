import { tripFields } from '../types/tripFields';
import { TLocation, locationFields } from '../types/location';
import { newTrip } from '../types/newTrip';

export const toNewTrip = ({
  name,
  location,
  duration,
  price,
  maxGroupSize,
  tecnicalDifficulty,
  physicalDifficulty,
  numOfReviews,
  reviewAverage,
  mainImg,
  images,
  startDates,
  description,
}: tripFields): newTrip => {
  const trip: newTrip = {
    name: parseName(name),
    location: parseLocation(location),
    duration: parseDuration(duration),
    price: parsePrice(price),
    maxGroupSize: parseMaxGroupSize(maxGroupSize),
  };

  return trip;
};

const parseMaxGroupSize = (maxGroupSize: unknown): number => {
  if (!isNumber(maxGroupSize)) {
    throw new Error('Invalid type of maxGroupSize');
  }
  return maxGroupSize;
};
const parsePrice = (price: unknown): number => {
  if (!isNumber(price)) {
    throw new Error('Invalid type of price');
  }
  return price;
};
const parseDuration = (duration: unknown): number => {
  if (!isNumber(duration)) {
    throw new Error('Invalid type of duration');
  }
  return duration;
};

const parseLocation = ({ country, city }: locationFields): TLocation => {
  if (!isString(country) || !isString(city)) {
    throw new Error('Invalid type of location city or country');
  }

  const location: TLocation = {
    city,
    country,
  };

  return location;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Invalid type of trip name');
  }
  return name;
};

const isString = (val: unknown): val is string => {
  return typeof val === 'string' || val instanceof String;
};

const isNumber = (val: unknown): val is number => {
  return typeof val === 'number' || val instanceof Number;
};
