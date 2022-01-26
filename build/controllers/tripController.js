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
const tripModel_1 = __importDefault(require("../models/tripModel"));
const trip_1 = require("../typeguards/trip");
const getAllTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield tripModel_1.default.find(req.query);
    res.status(200).json({
        docs: trips.length,
        trips,
    });
});
const getOneTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield tripModel_1.default.findById({ _id: req.params.id });
    if (!trip) {
        return res.status(400).json({
            status: 'fail',
            message: 'No document with that ID',
        });
    }
    return res.status(200).json(trip);
});
const createTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const checkedReqBody = (0, trip_1.typeChecksToReqBody)(req.body);
    const trip = yield tripModel_1.default.create(checkedReqBody);
    res.status(201).json(trip);
});
const updateTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const checkedReqBody = (0, trip_1.typeChecksToReqBody)(req.body);
    const trip = yield tripModel_1.default.findByIdAndUpdate({ _id: req.params.id }, 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    checkedReqBody, {
        new: true,
        runValidators: true,
    });
    if (!trip) {
        return res.status(400).json({
            status: 'fail',
            message: 'No document with that ID',
        });
    }
    return res.status(200).json(trip);
});
const deleteTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = yield tripModel_1.default.findByIdAndDelete({
        _id: req.params.id,
    });
    if (!trip) {
        return res.status(400).json({
            status: 'fail',
            message: 'No document with that ID',
        });
    }
    return res.status(204).end();
});
exports.default = {
    getAllTrips,
    createTrip,
    deleteTrip,
    getOneTrip,
    updateTrip,
};
