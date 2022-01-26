"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = void 0;
const isString = (val) => {
    return typeof val === 'string' || val instanceof String;
};
exports.isString = isString;
