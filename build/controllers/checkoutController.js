"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../utils/config"));
const stripe_1 = __importDefault(require("stripe"));
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
//import { v4 as uuid } from 'uuid';
const stripe = new stripe_1.default(config_1.default.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});
const handleCheckout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { token, trip } = req.body;
    const params = {
        name: token.card.name,
        email: token.email,
        source: token.id,
    };
    const customer = yield stripe.customers.create(params);
    yield stripe.charges.create({
        amount: trip.price * 100,
        customer: customer.id,
        currency: 'usd',
        description: `Purchased the ${trip.name}`,
        shipping: {
            name: token.card.name,
            address: {
                line1: token.card.address_line1,
                city: token.card.address_city,
            },
        },
    });
    const booking = yield bookingModel_1.default.findByIdAndUpdate({ _id: trip.bookingId }, {
        status: 'paid',
    }, {
        runValidators: true,
        new: true,
    });
    res.status(200).json({
        status: 'success',
        email: customer.email,
        booking,
    });
});
exports.default = {
    handleCheckout,
};
