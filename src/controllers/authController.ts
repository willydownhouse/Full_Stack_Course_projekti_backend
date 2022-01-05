import User from '../models/userModel';
import IUser from '../interfaces/user';
import { NextFunction, Request, Response } from 'express';
import {
  checkSignUpReqBody,
  checkLoginReqBody,
  checkedReqBody,
} from '../typeguards/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import { Decoded } from '../interfaces/utils';

const signUp = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const checked: checkedReqBody = checkSignUpReqBody(req.body);

  const user: IUser = await User.create({
    ...checked,
    role: 'user',
  });

  res.status(201).json(user);
};

const login = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { email, password }: checkedReqBody = checkLoginReqBody(req.body);

  const user: IUser | null = await User.findOne({ email }).select('password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({
      status: 'fail',
      message: 'Wrong email or password',
    });
  }

  if (user) {
    const token = jwt.sign({ id: user.id }, config.JWT_SECRET as string, {
      expiresIn: config.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      token,
    });
  }
};

const protect = async (req: Request, res: Response, next: NextFunction) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return res.status(401).json({
      status: 'fail',
      message: 'Please login to get access',
    });
  } else {
    const token = req.headers.authorization.substring(7);

    const decoded = jwt.verify(token, config.JWT_SECRET as string);

    const user: IUser | null = await User.findById((decoded as Decoded).id);

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'No user for this token',
      });
    }
    console.log(user);
    //req.user = user.email;
  }

  return next();
};

export default {
  signUp,
  login,
  protect,
};
