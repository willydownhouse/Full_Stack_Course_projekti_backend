const isString = (val: unknown): val is string => {
  return typeof val === 'string' || val instanceof String;
};

export const makeSureThatTripNameIsString = (reqbody: any): any => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name } = reqbody;

  if (name && isString(name)) {
    return reqbody;
  }
  throw new Error('Missing or invalid type of trip name');
};
