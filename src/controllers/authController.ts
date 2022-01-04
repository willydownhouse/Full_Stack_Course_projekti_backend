import User from '../models/userModel';
import IUser from '../interfaces/user';
import { Request, Response } from 'express';
import {
  checkSignUpReqBody,
  checkLoginReqBody,
  checkedReqBody,
} from '../typeguards/user';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from '../utils/config';

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

  const user: IUser | null = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({
      status: 'fail',
      message: 'Wrong username or password',
    });
  }

  if (user) {
    const token: string = sign({ id: user.id }, config.JWT_SECRET as string);

    res.status(200).json({
      token,
    });
  }
};

export default {
  signUp,
  login,
};
