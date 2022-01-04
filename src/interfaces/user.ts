import { TName } from '../types/name';
import mongoose from 'mongoose';

export default interface IUser {
  id: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  confirmPassword: string | undefined;
  role: string;
  name?: TName;
  active: boolean;
}
