"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeChecksToReqBody = void 0;
const moment_1 = __importDefault(require("moment"));
const utils_1 = require("./utils");
const typeChecksToReqBody = (reqbody) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, startDates, description } = reqbody;
    if (name && !(0, utils_1.isString)(name)) {
        throw new Error('Invalid type of trip name');
    }
    if (description && !(0, utils_1.isString)(description)) {
        throw new Error('Invalid type of trip description');
    }
    if (startDates) {
        if (!Array.isArray(startDates)) {
            throw new Error('Start dates must be on array of strings on format DD/MM/YYYY');
        }
        startDates.forEach((val) => {
            if (!(0, moment_1.default)(val, 'DD/MM/YYYY').isValid()) {
                throw new Error('There is invalid dates in start dates array');
            }
        });
    }
    return reqbody;
};
exports.typeChecksToReqBody = typeChecksToReqBody;
