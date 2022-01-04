import { isString } from './utils';

type signUpLoginFields = {
  email: unknown;
  password: unknown;
  confirmPassword?: unknown;
};

export interface checkedReqBody {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const checkSignUpReqBody = ({
  email,
  password,
  confirmPassword,
}: signUpLoginFields): checkedReqBody => {
  if (!email || !isString(email)) {
    throw new Error('Missing or invalid email');
  }
  if (!password || !isString(password)) {
    throw new Error('Missing or invalid password');
  }
  if (!confirmPassword || !isString(confirmPassword)) {
    throw new Error('Missing or invalid confirmed password');
  }

  return { email, password, confirmPassword };
};

export const checkLoginReqBody = ({
  email,
  password,
}: signUpLoginFields): checkedReqBody => {
  if (!email || !isString(email)) {
    throw new Error('Wrong email or password');
  }
  if (!password || !isString(password)) {
    throw new Error('Wrong email or password');
  }
  return { email, password };
};
