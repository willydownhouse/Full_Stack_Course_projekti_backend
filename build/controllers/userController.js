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
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.find(req.query);
    res.status(200).json({
        docs: users.length,
        data: users,
    });
});
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById({ _id: req.params.id });
    if (!user) {
        return res.status(400).json({
            status: 'fail',
            message: 'No document with that ID',
        });
    }
    return res.status(200).json(user);
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.create(req.body);
    res.status(201).json(user);
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findByIdAndUpdate({ _id: req.params.id }, 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    req.body, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return res.status(400).json({
            status: 'fail',
            message: 'No document with that ID',
        });
    }
    return res.status(200).json(user);
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findByIdAndDelete({
        _id: req.params.id,
    });
    if (!user) {
        return res.status(400).json({
            status: 'fail',
            message: 'No document with that ID',
        });
    }
    return res.status(204).end();
});
exports.default = {
    getAllUsers,
    createUser,
    getOneUser,
    deleteUser,
    updateUser,
};
