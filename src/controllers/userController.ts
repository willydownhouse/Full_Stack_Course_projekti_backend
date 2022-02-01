import IUser from '../interfaces/user';
import User from '../models/userModel';
import { Request, Response } from 'express';

const getAllUsers = async (req: Request, res: Response) => {
  const users: IUser[] = await User.find(req.query);

  res.status(200).json({
    docs: users.length,
    users,
  });
};

const getOneUser = async (req: Request, res: Response) => {
  const user: IUser | null = await User.findById({ _id: req.params.id });

  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  return res.status(200).json(user);
};

const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);

  res.status(201).json(user);
};

const updateUser = async (req: Request, res: Response) => {
  const user: IUser | null = await User.findByIdAndUpdate(
    { _id: req.params.id },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }
  return res.status(200).json(user);
};

const deleteUser = async (req: Request, res: Response) => {
  const user: IUser | null = await User.findByIdAndDelete({
    _id: req.params.id,
  });

  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  return res.status(204).end();
};

export const checkIfUserExists = async (req: Request, res: Response) => {
  const user: IUser | null = await User.findOne({ _id: req.params.id });

  res.status(200).json({
    user: user ? true : false,
  });
};

export default {
  getAllUsers,
  createUser,
  getOneUser,
  deleteUser,
  updateUser,
  checkIfUserExists,
};
