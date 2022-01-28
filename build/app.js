"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./utils/config"));
const errorController_1 = require("./controllers/errorController");
const tripRouter_1 = __importDefault(require("./routes/tripRouter"));
const testRouter_1 = __importDefault(require("./routes/testRouter"));
const signupRouter_1 = __importDefault(require("./routes/signupRouter"));
const loginRouter_1 = __importDefault(require("./routes/loginRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const bookingRouter_1 = __importDefault(require("./routes/bookingRouter"));
const reviewRouter_1 = __importDefault(require("./routes/reviewRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
console.log('ENVIRONMENT:');
console.log(process.env.NODE_ENV);
const db = config_1.default.DB_CONNECTION;
mongoose_1.default
    .connect(db)
    .then(() => {
    console.log('DB connected');
})
    .catch(() => {
    console.log('There was a problem connecting to database ');
});
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
if (process.env.NODE_ENV === 'test') {
    app.use('/api/testing', testRouter_1.default);
}
app.use('/api/signup', signupRouter_1.default);
app.use('/api/login', loginRouter_1.default);
app.use('/api/trips', tripRouter_1.default);
app.use('/api/users', userRouter_1.default);
app.use('/api/bookings', bookingRouter_1.default);
app.use('/api/reviews', reviewRouter_1.default);
app.get('/health', (_, res) => {
    res.send('ok 1');
});
app.use(errorController_1.unknownEndpoint);
app.use(errorController_1.errorController);
exports.default = app;
