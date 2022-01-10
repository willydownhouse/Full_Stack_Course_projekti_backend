import Review from '../models/reviewModel';
import Trip from '../models/tripModel';
import ITrip from '../interfaces/trip';
import IReview from '../interfaces/review';
import { Request, Response } from 'express';

const getAll = async (req: Request, res: Response) => {
  const reviews: IReview[] = await Review.find(req.query);

  res.status(200).json({
    docs: reviews.length,
    reviews,
  });
};
const getOne = async (req: Request, res: Response) => {
  const review: IReview | null = await Review.findById({ _id: req.params.id });

  if (!review) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  return res.status(200).json(review);
};
const create = async (req: Request, res: Response) => {
  if (!req.body.tripId) {
    return res.status(401).json({
      status: 'fail',
      message: 'Please choose a trip for your review',
    });
  }

  const trip: ITrip | null = await Trip.findById(req.body.tripId);

  if (!trip) {
    return res.status(400).json({
      status: 'fail',
      message: 'No trip with that ID',
    });
  }

  const alreadyReviewedThisTrip: IReview | null = await Review.findOne({
    userId: req.user?.id,
    tripId: trip.id,
  });

  if (alreadyReviewedThisTrip) {
    return res.status(400).json({
      status: 'fail',
      message: 'You have already reviewed this trip',
    });
  }

  const review: IReview = await Review.create({
    userId: req.user?.id,
    createdAt: new Date().toISOString(),
    tripId: trip.id,
    ...req.body,
  });

  return res.status(201).json(review);
};
const update = async (req: Request, res: Response) => {
  const review: IReview | null = await Review.findByIdAndUpdate(
    { _id: req.params.id },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    req.body,
    { new: true, runValidators: true }
  );
  if (!review) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  return res.status(200).json(review);
};
const deleteReview = async (req: Request, res: Response) => {
  const review: IReview | null = await Review.findByIdAndDelete({
    _id: req.params.id,
  });
  if (!review) {
    return res.status(400).json({
      status: 'fail',
      message: 'No document with that ID',
    });
  }

  return res.status(204).end();
};

export default {
  getAll,
  getOne,
  create,
  update,
  deleteReview,
};
