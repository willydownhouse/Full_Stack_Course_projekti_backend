"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoginReqBody = exports.checkSignUpReqBody = void 0;
const utils_1 = require("./utils");
const checkSignUpReqBody = ({ email, password, confirmPassword, }) => {
    if (!email || !(0, utils_1.isString)(email)) {
        throw new Error('Please insert your email');
    }
    if (!password || !(0, utils_1.isString)(password)) {
        throw new Error('Please insert your password');
    }
    if (!confirmPassword || !(0, utils_1.isString)(confirmPassword)) {
        throw new Error('Please confirm your password');
    }
    return { email, password, confirmPassword };
};
exports.checkSignUpReqBody = checkSignUpReqBody;
const checkLoginReqBody = ({ email, password, }) => {
    if (!email || !(0, utils_1.isString)(email)) {
        throw new Error('Please insert your email');
    }
    if (!password || !(0, utils_1.isString)(password)) {
        throw new Error('Please insert your password');
    }
    return { email, password };
};
exports.checkLoginReqBody = checkLoginReqBody;
