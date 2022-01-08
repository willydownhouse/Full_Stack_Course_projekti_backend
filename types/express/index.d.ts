import { RequestUser } from '../../src/interfaces/utils';

declare global {
  namespace Express {
    interface Request {
      user?: RequestUser;
    }
  }
}
