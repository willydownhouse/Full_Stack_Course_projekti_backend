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
exports.sendEmailAboutNewBookingToAdmin = exports.sendConfirmationEmailToCustomer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../utils/config"));
const transporterDev = nodemailer_1.default.createTransport({
    host: config_1.default.EMAIL_HOST,
    port: config_1.default.EMAIL_PORT,
    auth: {
        user: config_1.default.EMAIL_USERNAME,
        pass: config_1.default.EMAIL_PASSWORD,
    },
});
const transporterProd = nodemailer_1.default.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    tls: {
        ciphers: 'SSLv3',
    },
    requireTLS: true,
    auth: {
        user: 'adventure_buddy@outlook.com',
        pass: config_1.default.EMAIL_PASSWORD_PROD,
    },
});
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: 'Adventure Buddy <adventure_buddy@outlook.com',
        to: options.email,
        subject: options.subject,
        text: options.text,
    };
    config_1.default.NODE_ENV === 'development'
        ? yield transporterDev.sendMail(mailOptions)
        : yield transporterProd.sendMail(mailOptions);
});
const sendConfirmationEmailToCustomer = (bookerEmail, tripName, date) => {
    return sendEmail({
        email: bookerEmail,
        subject: `You succesfully booked ${tripName}`,
        text: `Thank you ${bookerEmail} for booking ${tripName} starting at ${date}.\n\n Best regards, \n\n Adventure Buddy `,
    });
};
exports.sendConfirmationEmailToCustomer = sendConfirmationEmailToCustomer;
const sendEmailAboutNewBookingToAdmin = (emailTo, bookerEmail, tripName, date) => {
    return sendEmail({
        email: emailTo,
        subject: `New booking for ${tripName}`,
        text: `${bookerEmail} booked for ${tripName} start date ${date}.`,
    });
};
exports.sendEmailAboutNewBookingToAdmin = sendEmailAboutNewBookingToAdmin;
