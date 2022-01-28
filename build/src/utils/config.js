"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const DB_CONNECTION = process.env.NODE_ENV === 'test'
    ? process.env.DB_CONNECTION_TEST
    : process.env.DB_CONNECTION;
exports.default = {
    PORT,
    DB_CONNECTION,
    JWT_SECRET,
    JWT_EXPIRES_IN,
};
