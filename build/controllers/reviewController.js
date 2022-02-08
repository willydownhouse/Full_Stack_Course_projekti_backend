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
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const tripModel_1 = __importDefault(require("../models/tripModel"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield reviewModel_1.default.find(req.query)
        .populate('user', 'name -_id')
        .populate('trip', 'name -_id');
    res.status(200).json({
        docs: reviews.length,
        reviews,
    });
});
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield reviewModel_1.default.findById({
        _id: req.params.id,
    }).populate('user', 'name -_id');
    if (!review) {
        return res.status(400).json({
            status: 'fail',
            message: 'No document with that ID',
        });
    }
    return res.status(200).json(review);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!req.body.trip) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please choose a trip for your review',
        });
    }
    const trip = yield tripModel_1.default.findById(req.body.trip);
    if (!trip) {
        return res.status(400).json({
            status: 'fail',
            message: 'No trip with that ID',
        });
    }
    const alreadyReviewedThisTrip = yield reviewModel_1.default.findOne({
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        trip: trip.id,
    });
    if (alreadyReviewedThisTrip) {
        return res.status(400).json({
            status: 'fail',
            message: 'You have already reviewed this trip',
        });
    }
    const review = yield reviewModel_1.default.create(Object.assign({ user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id, createdAt: new Date().toISOString(), trip: trip.id }, req.body));
    return res.status(201).json(review);
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield reviewModel_1.default.findByIdAndUpdate({ _id: req.params.id }, 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    req.body, { new: true, runValidators: true });
    if (!review) {
        return res.status(400).json({
            status: 'fail',
            message: 'No document with that ID',
        });
    }
    return res.status(200).json(review);
});
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield reviewModel_1.default.findByIdAndDelete({
        _id: req.params.id,
    });
    if (!review) {
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
    deleteReview,
};
