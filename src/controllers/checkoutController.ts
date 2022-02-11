import config from '../utils/config';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import Booking from '../models/bookingModel';
import IBooking from '../interfaces/booking';
//import { v4 as uuid } from 'uuid';

const stripe = new Stripe(config.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
});

const handleCheckout = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { token, trip } = req.body;

  const params: Stripe.CustomerCreateParams = {
    name: token.card.name as string,
    email: token.email as string,
    source: token.id as string,
  };

  const customer: Stripe.Response<Stripe.Customer> =
    await stripe.customers.create(params);

  await stripe.charges.create({
    amount: trip.price * 100,
    customer: customer.id,
    currency: 'usd',
    description: `Purchased the ${trip.name}`,
    shipping: {
      name: token.card.name as string,
      address: {
        line1: token.card.address_line1 as string,
        city: token.card.address_city as string,
      },
    },
  });

  const booking: IBooking | null = await Booking.findByIdAndUpdate(
    { _id: trip.bookingId as string },
    {
      status: 'paid',
    },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    email: customer.email,
    booking,
  });
};

export default {
  handleCheckout,
};
