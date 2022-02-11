"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkoutController_1 = __importDefault(require("../controllers/checkoutController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.use(authController_1.default.protect);
router.route('/').post(checkoutController_1.default.handleCheckout);
exports.default = router;
