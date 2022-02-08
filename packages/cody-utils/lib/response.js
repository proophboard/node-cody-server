"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCodyWarning = exports.isCodyError = void 0;
const cody_types_1 = require("@proophboard/cody-types");
const isCodyError = (err) => {
    if (err && typeof err === 'object') {
        return err.hasOwnProperty('cody') && err.hasOwnProperty('type') && err.type === cody_types_1.CodyResponseType.Error;
    }
    return false;
};
exports.isCodyError = isCodyError;
const isCodyWarning = (warning) => {
    if (warning && typeof warning === 'object') {
        return warning.hasOwnProperty('cody') && warning.hasOwnProperty('type') && warning.type === cody_types_1.CodyResponseType.Warning;
    }
    return false;
};
exports.isCodyWarning = isCodyWarning;
