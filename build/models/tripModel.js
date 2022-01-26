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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const tripSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: {
            values: ['ski', 'mtb', 'paragliding'],
            message: '{VALUE} is not supported',
        },
        required: [true, 'Trip must have a type'],
    },
    name: {
        type: String,
        required: [true, 'Trip must have a name'],
        unique: true,
    },
    location: {
        country: {
            type: String,
            required: [true, 'Location must have a country'],
        },
        city: {
            type: String,
            required: [true, 'Location must have a city'],
        },
    },
    duration: {
        type: Number,
        required: [true, 'Trip must have a duration'],
    },
    price: {
        type: Number,
        required: [true, 'Trip must have a price'],
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'Trip must have a max groupsize'],
        min: 3,
        max: 6,
    },
    tecnicalDifficulty: {
        type: String,
        enum: {
            values: ['easy', 'intermediate', 'hard', 'extreme'],
            message: '{VALUE} is not supported',
        },
        default: 'intermediate',
    },
    physicalDifficulty: {
        type: String,
        enum: {
            values: ['easy', 'intermediate', 'hard', 'extreme'],
            message: '{VALUE} is not supported',
        },
        default: 'intermediate',
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviewAverage: {
        type: Number,
        default: 4.5,
    },
    mainImg: {
        type: String,
    },
    images: {
        type: [String],
    },
    startDates: {
        type: [String],
    },
    description: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
tripSchema.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model('Trip', tripSchema);
