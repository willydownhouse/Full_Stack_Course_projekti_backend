import { TName } from '../types/name';

export default interface IUser {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  name?: TName;
  active: boolean;
}
