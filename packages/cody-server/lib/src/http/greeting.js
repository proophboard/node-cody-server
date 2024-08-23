"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greeting = void 0;
const cody_types_1 = require("@proophboard/cody-types");
const greeting = (user) => {
    return {
        cody: `Hey ${user}, Cody here. Before we can start, I need to sync the board. This might take a moment.`,
        details: ["If you need guidance just ask me with: %c/help", 'background-color: rgba(251, 159, 75, 0.2)'],
        type: cody_types_1.CodyResponseType.SyncRequired,
    };
};
exports.greeting = greeting;
