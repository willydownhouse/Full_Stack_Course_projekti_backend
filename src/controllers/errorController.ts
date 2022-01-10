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
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: err.message,
    });
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: `${err.message}, please login again.`,
    });
  }

  return next(err);
};

export const unknownEndpoint = (_: Request, res: Response) => {
  return res.status(400).json({
    status: 'error',
    error: 'unknown endpoint',
  });
};
