import express, { Application } from 'express';
import mongoose from 'mongoose';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import config from './utils/config';
import {
  errorController,
  unknownEndpoint,
} from './controllers/errorController';
import tripRouter from './routes/tripRouter';
import testRouter from './routes/testRouter';
import signupRouter from './routes/signupRouter';
import loginRouter from './routes/loginRouter';
import userRouter from './routes/userRouter';
import bookingRouter from './routes/bookingRouter';
import reviewRouter from './routes/reviewRouter';

const app: Application = express();

app.use(express.json());
app.use(cors());

const db = config.DB_CONNECTION || 'db';

mongoose
  .connect(db)
  .then(() => {
    console.log('DB connected');
  })
  .catch(() => {
    console.log('There was a problem connecting to database ');
  });

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testRouter);
}
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/trips', tripRouter);
app.use('/api/users', userRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/reviews', reviewRouter);

app.use(unknownEndpoint);
app.use(errorController);

export default app;
