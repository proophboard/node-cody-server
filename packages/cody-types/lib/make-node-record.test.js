"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeRecord_1 = require("./NodeRecord");
const index_1 = require("./index");
const rawNode = {
    id: "1234",
    name: "Test Me",
    type: index_1.NodeType.command,
    tags: [],
    metadata: null,
    childrenList: [],
    defaultLayer: false,
    parent: null,
    description: "A test command",
    geometry: { x: 10, y: 23 },
    layer: false,
    link: "https://app.prooph-board.com",
    sourcesList: [],
    targetsList: []
};
test("It makes node from raw data", () => {
    const node = (0, NodeRecord_1.makeNodeRecord)(rawNode);
    expect(node.name).toEqual('Test Me');
    expect(node.type).toEqual(index_1.NodeType.command);
});
test("It uses name from metadata if present", () => {
    const node = (0, NodeRecord_1.makeNodeRecord)({ ...rawNode, metadata: JSON.stringify({ $nodeName: "Me Again" }) });
    expect(node.name).toEqual('Me Again');
    expect(node.type).toEqual(index_1.NodeType.command);
});
test("It uses type from metadata if present", () => {
    const node = (0, NodeRecord_1.makeNodeRecord)({ ...rawNode, metadata: JSON.stringify({ $nodeType: index_1.NodeType.event }) });
    expect(node.name).toEqual('Test Me');
    expect(node.type).toEqual(index_1.NodeType.event);
});
