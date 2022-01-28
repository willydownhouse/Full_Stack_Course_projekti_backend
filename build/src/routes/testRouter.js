"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testController_1 = __importDefault(require("../controllers/testController"));
const router = express_1.default.Router();
router.route('/reset').post(testController_1.default.resetDatabase);
router.route('/init').post(testController_1.default.initDataBase);
exports.default = router;
