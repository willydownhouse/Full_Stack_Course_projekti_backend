"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const bookingController_1 = __importDefault(require("../controllers/bookingController"));
const router = express_1.default.Router();
router.route('/:id/exists').get(userController_1.default.checkIfUserExists);
router.use(authController_1.default.protect);
router.route('/:id/bookings').get(bookingController_1.default.getAllForLoggedInUser);
router.use(authController_1.default.restrictTo('admin'));
router
    .route('/')
    .get(userController_1.default.getAllUsers)
    .post(userController_1.default.createUser);
router
    .route('/:id')
    .get(userController_1.default.getOneUser)
    .patch(userController_1.default.updateUser)
    .delete(userController_1.default.deleteUser);
exports.default = router;
