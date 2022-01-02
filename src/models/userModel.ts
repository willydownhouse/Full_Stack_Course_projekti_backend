import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';
import isemail from 'isemail';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'User must have an email'],
      validate: {
        validator: function (val: string): boolean {
          return isemail.validate(val);
        },
      },
    },
    password: {
      type: String,
      minlength: [6, 'Passsword must be at least 6 characters'],
      maxlength: [15, 'Passsword must be under 15 characters'],
      required: [true, 'User must have a password'],
    },
    confirmPassword: {
      type: String,
      required: [true, 'Password must be confirmed'],
      validate: {
        validator: function (this: IUser, val: string) {
          return val === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin', 'guide'],
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
    name: {
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', userSchema);
