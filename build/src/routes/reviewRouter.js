"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = __importDefault(require("../controllers/reviewController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.route('/').get(reviewController_1.default.getAll);
router.route('/:id').get(reviewController_1.default.getOne);
router.use(authController_1.default.protect);
router.route('/').post(reviewController_1.default.create);
router.use(authController_1.default.restrictTo('admin'));
router
    .route('/:id')
    .patch(reviewController_1.default.update)
    .delete(reviewController_1.default.deleteReview);
exports.default = router;
