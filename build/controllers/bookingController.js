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
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
const tripModel_1 = __importDefault(require("../models/tripModel"));
const booking_1 = require("../typeguards/booking");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield bookingModel_1.default.find(req.query)
        .populate('user', 'name email -_id')
        .populate('trip', 'name -_id');
    res.status(200).json({
        docs: bookings.length,
        bookings,
    });
});
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield bookingModel_1.default.findById(req.params.id);
    if (!booking) {
        return res.status(400).json({
            status: 'fail',
            message: 'No document with that ID',
        });
    }
    return res.status(200).json(booking);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { trip, trip_date } = (0, booking_1.checkBookingReqBody)(req.body);
    const tripExists = yield tripModel_1.default.findOne({
        _id: trip,
        startDates: trip_date,
    });
    if (!tripExists) {
        return res.status(400).json({
            status: 'fail',
            message: 'No trip found with that ID and trip date',
        });
    }
    const alreadyBookedForThisTrip = yield bookingModel_1.default.findOne({
        trip: trip,
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        trip_date,
    });
    if (alreadyBookedForThisTrip) {
        return res.status(400).json({
            status: 'fail',
            message: 'You have already booked for this trip',
        });
    }
    const booking = yield bookingModel_1.default.create({
        user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
        trip,
        trip_date,
        createdAt: new Date().toISOString(),
        status: 'booked',
    });
    return res.status(201).json(booking);
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield bookingModel_1.default.findByIdAndUpdate({ _id: req.params.id }, 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    req.body, {
        new: true,
        runValidators: true,
    });
    if (!booking) {
        return res.status(400).json({
            status: 'fail',
            message: 'No document with that ID',
        });
    }
    return res.status(200).json(booking);
});
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield bookingModel_1.default.findByIdAndDelete({
        _id: req.params.id,
    });
    if (!booking) {
        return res.status(400).json({
            status: 'fail',
            message: 'No document with that ID',
        });
    }
    return res.status(204).end();
});
exports.default = {
    getAll,
    getOne,
    create,
    update,
    deleteBooking,
};
