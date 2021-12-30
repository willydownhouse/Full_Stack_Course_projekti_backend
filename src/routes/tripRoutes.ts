import express, { Router } from 'express';
import tripController from '../controllers/tripController';

const router: Router = express.Router();

router
  .route('/')
  .get(tripController.getAllTrips)
  .post(tripController.createTrip);

router
  .route('/:id')
  .delete(tripController.deleteTrip)
  .get(tripController.getOneTrip);

export default router;
