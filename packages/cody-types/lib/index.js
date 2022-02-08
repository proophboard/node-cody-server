"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRecord = exports.makeNodeRecord = exports.GraphPointRecord = exports.NodeType = exports.CodyResponseType = void 0;
const immutable_1 = require("immutable");
var CodyResponseType;
(function (CodyResponseType) {
    CodyResponseType["Info"] = "Info";
    CodyResponseType["Error"] = "Error";
    CodyResponseType["Warning"] = "Warning";
    CodyResponseType["Question"] = "Question";
    CodyResponseType["SyncRequired"] = "SyncRequired";
    CodyResponseType["Empty"] = "Empty";
})(CodyResponseType = exports.CodyResponseType || (exports.CodyResponseType = {}));
var NodeType;
(function (NodeType) {
    NodeType["event"] = "event";
    NodeType["command"] = "command";
    NodeType["role"] = "role";
    NodeType["aggregate"] = "aggregate";
    NodeType["document"] = "document";
    NodeType["policy"] = "policy";
    NodeType["hotSpot"] = "hotSpot";
    NodeType["externalSystem"] = "externalSystem";
    NodeType["ui"] = "ui";
    NodeType["feature"] = "feature";
    NodeType["boundedContext"] = "boundedContext";
    NodeType["freeText"] = "freeText";
    NodeType["textCard"] = "textCard";
    NodeType["edge"] = "edge";
    NodeType["misc"] = "misc";
    NodeType["icon"] = "icon";
    NodeType["image"] = "image";
    NodeType["layer"] = "layer";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
class GraphPointRecord extends (0, immutable_1.Record)({ x: 0, y: 0 }) {
}
exports.GraphPointRecord = GraphPointRecord;
var NodeRecord_1 = require("./NodeRecord");
Object.defineProperty(exports, "makeNodeRecord", { enumerable: true, get: function () { return NodeRecord_1.makeNodeRecord; } });
var NodeRecord_2 = require("./NodeRecord");
Object.defineProperty(exports, "NodeRecord", { enumerable: true, get: function () { return NodeRecord_2.NodeRecord; } });
