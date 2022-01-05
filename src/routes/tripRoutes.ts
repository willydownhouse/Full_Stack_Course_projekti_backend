import express, { Router } from 'express';
import tripController from '../controllers/tripController';
import authController from '../controllers/authController';

const router: Router = express.Router();

router.route('/').get(tripController.getAllTrips);
router.route('/:id').get(tripController.getOneTrip);

router.use(authController.protect);

router.route('/').post(tripController.createTrip);

router
  .route('/:id')
  .delete(tripController.deleteTrip)
  .patch(tripController.updateTrip);

export default router;
