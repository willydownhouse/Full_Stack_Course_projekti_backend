"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tripController_1 = __importDefault(require("../controllers/tripController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.route('/').get(tripController_1.default.getAllTrips);
router.route('/:id').get(tripController_1.default.getOneTrip);
router.use(authController_1.default.protect);
router.use(authController_1.default.restrictTo('admin'));
router.route('/').post(tripController_1.default.createTrip);
router
    .route('/:id')
    .delete(tripController_1.default.deleteTrip)
    .patch(tripController_1.default.updateTrip);
exports.default = router;
