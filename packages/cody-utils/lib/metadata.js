"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringMetadata = exports.parseJsonMetadata = void 0;
const cody_types_1 = require("@proophboard/cody-types");
const response_1 = require("./response");
const parseJsonMetadata = (node) => {
    const meta = (0, exports.getStringMetadata)(node);
    if ((0, response_1.isCodyError)(meta)) {
        return meta;
    }
    try {
        return JSON.parse(meta);
    }
    catch (e) {
        return {
            cody: `I was not able to parse metadata of "${node.getName()}". It's not valid JSON, is it?`,
            details: (e instanceof Error) ? e.toString() : e,
            type: cody_types_1.CodyResponseType.Error
        };
    }
};
exports.parseJsonMetadata = parseJsonMetadata;
const getStringMetadata = (node) => {
    if (node.getMetadata() === null) {
        return {
            cody: `Element "${node.getName()}" is missing metadata. Can't proceed without it!`,
            type: cody_types_1.CodyResponseType.Error
        };
    }
    return node.getMetadata();
};
exports.getStringMetadata = getStringMetadata;
