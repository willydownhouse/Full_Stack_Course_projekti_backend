import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

const DB_CONNECTION =
  process.env.NODE_ENV === 'test'
    ? process.env.DB_CONNECTION_TEST
    : process.env.DB_CONNECTION;

export default {
  PORT,
  DB_CONNECTION,
  JWT_SECRET,
};
