import express from 'express';
import userController from '../controllers/userController';
import authController from '../controllers/authController';
import bookingController from '../controllers/bookingController';

const router = express.Router();

router.route('/:id/exists').get(userController.checkIfUserExists);

router.use(authController.protect);

router.route('/:id/bookings').get(bookingController.getAllForLoggedInUser);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
