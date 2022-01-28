"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const isemail_1 = __importDefault(require("isemail"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'User must have an email'],
        validate: {
            validator: function (val) {
                return isemail_1.default.validate(val);
            },
        },
        unique: true,
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 characters'],
        maxlength: [50, 'Password must be under 50 characters'],
        required: [true, 'User must have a password'],
        select: false,
    },
    confirmPassword: {
        type: String || undefined,
        required: [true, 'Password must be confirmed'],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: 'Passwords are not the same',
        },
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin', 'guide'],
            message: '{VALUE} is not supported',
        },
        default: 'user',
    },
    name: {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
userSchema.plugin(mongoose_unique_validator_1.default);
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        this.confirmPassword = undefined;
        next();
    });
});
exports.default = mongoose_1.default.model('User', userSchema);
