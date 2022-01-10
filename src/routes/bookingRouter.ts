import express from 'express';
import bookingController from '../controllers/bookingController';
import authController from '../controllers/authController';

const router = express.Router();

router.use(authController.protect);

router.route('/').post(bookingController.create);

router.use(authController.restrictTo('admin'));

router.route('/').get(bookingController.getAll);

router
  .route('/:id')
  .get(bookingController.getOne)
  .patch(bookingController.update)
  .delete(bookingController.deleteBooking);

export default router;
