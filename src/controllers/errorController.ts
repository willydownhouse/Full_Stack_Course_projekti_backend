import { NextFunction, Request, Response } from 'express';

export const errorController = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('FROM ERRORCONTROLLER');
  console.log(err);

  if (
    err.name === 'ValidationError' ||
    err.name === 'CastError' ||
    err.name === 'Error'
  ) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  next(err);
};

export const unknownEndpoint = (_: Request, res: Response) => {
  return res.status(400).json({
    status: 'error',
    error: 'unknown endpoint',
  });
};
