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
    throw new Error('Please insert your email');
  }
  if (!password || !isString(password)) {
    throw new Error('Please insert your password');
  }
  if (!confirmPassword || !isString(confirmPassword)) {
    throw new Error('Please confirm your password');
  }

  return { email, password, confirmPassword };
};

export const checkLoginReqBody = ({
  email,
  password,
}: signUpLoginFields): checkedReqBody => {
  if (!email || !isString(email)) {
    throw new Error('Please insert your email');
  }
  if (!password || !isString(password)) {
    throw new Error('Please insert your password');
  }
  return { email, password };
};
