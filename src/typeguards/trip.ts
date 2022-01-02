import moment from 'moment';

const isString = (val: unknown): val is string => {
  return typeof val === 'string' || val instanceof String;
};

export const typeChecksToReqBody = (reqbody: any): any => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, startDates } = reqbody;

  if (name && !isString(name)) {
    throw new Error('Invalid type of trip name');
  }
  if (!Array.isArray(startDates)) {
    throw new Error(
      'Start dates must be on array of strings on format DD/MM/YYYY'
    );
  }

  startDates.forEach(val => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!moment(val, 'DD/MM/YYYY').isValid()) {
      throw new Error('Not a valid date');
    }
  });

  return reqbody;
};
