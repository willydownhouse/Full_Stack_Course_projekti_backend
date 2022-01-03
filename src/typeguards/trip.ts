import moment, { MomentInput } from 'moment';

const isString = (val: unknown): val is string => {
  return typeof val === 'string' || val instanceof String;
};

export const typeChecksToReqBody = (reqbody: any): any => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, startDates, description } = reqbody;

  if (name && !isString(name)) {
    throw new Error('Invalid type of trip name');
  }
  if (description && !isString(description)) {
    throw new Error('Invalid type of trip description');
  }

  if (startDates) {
    if (!Array.isArray(startDates)) {
      throw new Error(
        'Start dates must be on array of strings on format DD/MM/YYYY'
      );
    }
    startDates.forEach((val: MomentInput) => {
      if (!moment(val, 'DD/MM/YYYY').isValid()) {
        throw new Error('There is invalid dates in start dates array');
      }
    });
  }
  return reqbody;
};
