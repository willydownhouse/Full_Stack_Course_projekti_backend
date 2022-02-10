import express from 'express';
import checkoutController from '../controllers/checkoutController';
import authController from '../controllers/authController';

const router = express.Router();

router.use(authController.protect);

router.route('/').post(checkoutController.handleCheckout);

export default router;
