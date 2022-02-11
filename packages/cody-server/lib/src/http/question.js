"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.handleReply = exports.checkQuestion = void 0;
const cody_types_1 = require("@proophboard/cody-types");
let CurrentQuestion;
exports.checkQuestion = (res) => {
    if (res.type === cody_types_1.CodyResponseType.Question && res.reply) {
        CurrentQuestion = res.reply;
    }
    return res;
};
exports.handleReply = async (reply) => {
    if (CurrentQuestion) {
        const res = await CurrentQuestion(reply);
        CurrentQuestion = undefined;
        return res;
    }
    return {
        cody: "Sorry, not sure what to say.",
        details: "Did I ask anything?",
        type: cody_types_1.CodyResponseType.Warning
    };
};
exports.test = () => {
    return {
        cody: "Do you like bots?",
        details: "Answer with: Yes|no",
        type: cody_types_1.CodyResponseType.Question,
        reply: async (yes) => {
            console.log("Replied with: ", yes);
            return {
                cody: yes !== 'no' ? "Cool! I like you, too" : "Oh ok, maybe I can convince you that bots are awesome.",
                details: yes !== 'no' ? ":cody_dance:" : ":tears:",
                type: cody_types_1.CodyResponseType.Info
            };
        }
    };
};
