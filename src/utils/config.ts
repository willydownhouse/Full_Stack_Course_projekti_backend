import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const NODE_ENV = process.env.NODE_ENV;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

let DB_CONNECTION;

if (NODE_ENV === 'development') {
  DB_CONNECTION = process.env.DB_CONNECTION_DEV;
}
if (NODE_ENV === 'test') {
  DB_CONNECTION = process.env.DB_CONNECTION_TEST;
}
if (NODE_ENV === 'production') {
  DB_CONNECTION = process.env.DB_CONNECTION;
}

const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_PASSWORD_PROD = process.env.EMAIL_PASSWORD_PROD;

export default {
  NODE_ENV,
  PORT,
  DB_CONNECTION,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_PASSWORD_PROD,
  STRIPE_SECRET_KEY,
};
