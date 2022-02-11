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
exports.initDataBase = exports.resetDatabase = void 0;
const tripModel_1 = __importDefault(require("../models/tripModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const resetDatabase = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tripModel_1.default.deleteMany({});
    yield userModel_1.default.deleteMany({});
    yield bookingModel_1.default.deleteMany({});
    yield reviewModel_1.default.deleteMany({});
    res.status(204).end();
});
exports.resetDatabase = resetDatabase;
const initDataBase = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trips = yield tripModel_1.default.insertMany([
        {
            type: 'mtb',
            name: 'Finale MTB week',
            location: {
                city: 'Finale Ligure',
                country: 'Italy',
            },
            duration: 7,
            price: 399,
            maxGroupSize: 6,
            tecnicalDifficulty: 'intermediate',
            physicalDifficulty: 'hard',
            startDates: ['1/2/22', '8/2/22'],
            description: 'Seven days of hard riding in Liguria.',
        },
        {
            type: 'ski',
            name: 'Lyngen Ski week',
            location: {
                city: 'Lyngseidet',
                country: 'Norway',
            },
            duration: 7,
            price: 599,
            maxGroupSize: 6,
            tecnicalDifficulty: 'intermediate',
            physicalDifficulty: 'hard',
            startDates: ['1/3/22', '8/3/22'],
            description: 'Seven days of hard skiing in Lyngen Alps.',
        },
    ]);
    const user1 = new userModel_1.default({
        email: 'ville@test.fi',
        password: 'test1234',
        confirmPassword: 'test1234',
        name: {
            first_name: 'ville',
            last_name: 'kristian',
        },
    });
    const user2 = new userModel_1.default({
        email: 'admin@test.fi',
        password: 'test1234',
        confirmPassword: 'test1234',
        role: 'admin',
    });
    const user3 = new userModel_1.default({
        email: 'kimi@test.fi',
        password: 'test1234',
        confirmPassword: 'test1234',
        role: 'admin',
    });
    yield user2.save();
    yield user1.save();
    yield user3.save();
    res.status(201).json({
        user1,
        user2,
        trips,
    });
});
exports.initDataBase = initDataBase;
exports.default = {
    resetDatabase: exports.resetDatabase,
    initDataBase: exports.initDataBase,
};
