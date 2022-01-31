import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

let DB_CONNECTION;

if (process.env.NODE_ENV === 'development') {
  DB_CONNECTION = process.env.DB_CONNECTION_DEV;
}
if (process.env.NODE_ENV === 'test') {
  DB_CONNECTION = process.env.DB_CONNECTION_TEST;
}
if (process.env.NODE_ENV === 'production') {
  DB_CONNECTION = process.env.DB_CONNECTION;
}

export default {
  PORT,
  DB_CONNECTION,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
