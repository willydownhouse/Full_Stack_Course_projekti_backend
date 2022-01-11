import { isString } from './utils';

type bookingFields = {
  trip: unknown;
  trip_date: unknown;
};

export interface checkedReqBody {
  trip: string;
  trip_date: string;
}

export const checkBookingReqBody = ({
  trip,
  trip_date,
}: bookingFields): checkedReqBody => {
  if (!trip || !isString(trip)) {
    throw new Error('Please choose a trip for your booking');
  }
  if (!trip_date || !isString(trip_date)) {
    throw new Error('Please choose a trip date for your booking');
  }

  return {
    trip,
    trip_date,
  };
};
