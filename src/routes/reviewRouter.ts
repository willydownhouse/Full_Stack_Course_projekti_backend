import express from 'express';
import reviewController from '../controllers/reviewController';
import authController from '../controllers/authController';

const router = express.Router();

router.route('/').get(reviewController.getAll);
router.route('/:id').get(reviewController.getOne);

router.use(authController.protect);

router.route('/').post(reviewController.create);

router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .patch(reviewController.update)
  .delete(reviewController.deleteReview);

export default router;
