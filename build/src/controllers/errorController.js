"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndpoint = exports.errorController = void 0;
const errorController = (err, _, res, next) => {
    console.log('FROM ERRORCONTROLLER');
    console.log(err);
    if (err.name === 'ValidationError' ||
        err.name === 'CastError' ||
        err.name === 'Error') {
        return res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
    else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'error',
            message: err.message,
        });
    }
    else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            status: 'error',
            message: `${err.message}, please login again.`,
        });
    }
    return next(err);
};
exports.errorController = errorController;
const unknownEndpoint = (_, res) => {
    return res.status(400).json({
        status: 'error',
        error: 'unknown endpoint',
    });
};
exports.unknownEndpoint = unknownEndpoint;
