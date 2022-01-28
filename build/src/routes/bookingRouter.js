"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = __importDefault(require("../controllers/bookingController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.use(authController_1.default.protect);
router.route('/').post(bookingController_1.default.create);
router.use(authController_1.default.restrictTo('admin'));
router.route('/').get(bookingController_1.default.getAll);
router
    .route('/:id')
    .get(bookingController_1.default.getOne)
    .patch(bookingController_1.default.update)
    .delete(bookingController_1.default.deleteBooking);
exports.default = router;
