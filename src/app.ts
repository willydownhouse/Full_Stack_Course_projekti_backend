import express, { Application } from 'express';
import mongoose from 'mongoose';
import 'express-async-errors';

import config from './utils/config';
import {
  errorController,
  unknownEndpoint,
} from './controllers/errorController';
import tripRouter from './routes/tripRoutes';
import testRouter from './routes/testRouter';
import signupRouter from './routes/signupRouter';
import loginRouter from './routes/loginRouter';
import userRouter from './routes/userRouter';

const app: Application = express();

app.use(express.json());

const db = config.DB_CONNECTION || 'db';

mongoose
  .connect(db)
  .then(() => {
    console.log('DB connected');
  })
  .catch(() => {
    console.log('There was a problem connecting to database ');
  });

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testRouter);
}
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/trips', tripRouter);
app.use('/api/users', userRouter);

app.use(unknownEndpoint);
app.use(errorController);

export default app;
