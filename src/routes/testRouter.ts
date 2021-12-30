import express from 'express';
import testController from '../controllers/testController';

const router = express.Router();

router.route('/reset').post(testController.resetDatabase);

router.route('/init').post(testController.initDataBase);

export default router;
