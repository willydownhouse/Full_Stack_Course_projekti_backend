import express, { Router } from 'express';
import tripController from '../controllers/tripController';

const router: Router = express.Router();

router
  .route('/')
  .get(tripController.getAllTrips)
  .post(tripController.createTrip);

router
  .route('/:id')
  .get(tripController.getOneTrip)
  .delete(tripController.deleteTrip)
  .patch(tripController.updateTrip);

export default router;
