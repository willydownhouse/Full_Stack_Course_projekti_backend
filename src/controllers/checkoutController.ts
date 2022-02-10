import config from '../utils/config';
import Stripe from 'stripe';
import { Request, Response } from 'express';
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

  res.status(201).json({
    status: 'success',
    email: customer.email,
  });
};

export default {
  handleCheckout,
};
