"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringMetadata = exports.parseJsonMetadata = void 0;
const cody_types_1 = require("@proophboard/cody-types");
const parseJsonMetadata = (node) => {
    const [meta, err] = (0, exports.getStringMetadata)(node);
    if (err) {
        return [null, err];
    }
    try {
        return [JSON.parse(meta), undefined];
    }
    catch (e) {
        return [null, {
                cody: `I was not able to parse metadata of "${node.getName()}". It's not valid JSON, is it?`,
                details: (e instanceof Error) ? e.toString() : e,
                type: cody_types_1.CodyResponseType.Error
            }];
    }
};
exports.parseJsonMetadata = parseJsonMetadata;
const getStringMetadata = (node) => {
    if (node.getMetadata() === null) {
        return [null, {
                cody: `Element "${node.getName()}" is missing metadata. Can't proceed without it!`,
                type: cody_types_1.CodyResponseType.Error
            }];
    }
    return [node.getMetadata(), undefined];
};
exports.getStringMetadata = getStringMetadata;
