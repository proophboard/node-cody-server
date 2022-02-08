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
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileSync = exports.mkdirIfNotExistsSync = void 0;
const fs = __importStar(require("fs"));
const cody_types_1 = require("@proophboard/cody-types");
const mkdirIfNotExistsSync = (path, options) => {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, options);
        }
    }
    catch (e) {
        return {
            cody: `I tried to create the directory "${path}", but something went wrong :(`,
            details: (e instanceof Error) ? e.toString() : e,
            type: cody_types_1.CodyResponseType.Error
        };
    }
    return null;
};
exports.mkdirIfNotExistsSync = mkdirIfNotExistsSync;
const writeFileSync = (file, content, options) => {
    try {
        fs.writeFileSync(file, content, options);
    }
    catch (e) {
        console.error("Failed to write file: ", file, "with content: ", content);
        console.error(e);
        return {
            cody: "Oh that's not good. Something went wrong with the filesystem!",
            details: (e instanceof Error) ? e.toString() : e,
            type: cody_types_1.CodyResponseType.Error
        };
    }
    return null;
};
exports.writeFileSync = writeFileSync;
