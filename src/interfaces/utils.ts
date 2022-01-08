import mongoose from 'mongoose';

export interface Decoded {
  id: string;
  iat: number;
  exp: number;
}

export interface RequestUser {
  id: mongoose.Schema.Types.ObjectId;
  email: string;
  role: string;
  active: boolean;
}
