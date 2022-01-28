"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBookingReqBody = void 0;
const utils_1 = require("./utils");
const checkBookingReqBody = ({ trip, trip_date, }) => {
    if (!trip || !(0, utils_1.isString)(trip)) {
        throw new Error('Please choose a trip for your booking');
    }
    if (!trip_date || !(0, utils_1.isString)(trip_date)) {
        throw new Error('Please choose a trip date for your booking');
    }
    return {
        trip,
        trip_date,
    };
};
exports.checkBookingReqBody = checkBookingReqBody;
