import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.route('/').post(authController.login);

export default router;
