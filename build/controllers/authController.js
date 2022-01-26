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
const userModel_1 = __importDefault(require("../models/userModel"));
const user_1 = require("../typeguards/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const checked = (0, user_1.checkSignUpReqBody)(req.body);
    const user = yield userModel_1.default.create(Object.assign(Object.assign({}, checked), { role: 'user' }));
    return res.status(201).json(user);
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { email, password } = (0, user_1.checkLoginReqBody)(req.body);
    const user = yield userModel_1.default.findOne({ email }).select('password');
    if (!user) {
        return res.status(401).json({
            status: 'fail',
            message: 'Wrong email or password',
        });
    }
    if (!(yield bcrypt_1.default.compare(password, user.password))) {
        return res.status(401).json({
            status: 'fail',
            message: 'Wrong email or password',
        });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.JWT_SECRET, {
        expiresIn: config_1.default.JWT_EXPIRES_IN,
    });
    return res.status(200).json({
        token,
        user: user.id,
    });
});
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer')) {
        return res.status(401).json({
            status: 'fail',
            message: 'Please login to get access',
        });
    }
    else {
        const token = req.headers.authorization.substring(7);
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        const user = yield userModel_1.default.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'No user for this token',
            });
        }
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
            active: user.active,
        };
    }
    return next();
});
const restrictTo = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(401).json({
            status: 'fail',
            message: 'You are not allowed to do this action',
        });
    }
    return next();
};
exports.default = {
    signUp,
    login,
    protect,
    restrictTo,
};
