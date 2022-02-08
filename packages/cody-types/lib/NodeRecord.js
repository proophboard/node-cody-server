"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRecord = exports.makeNodeRecord = void 0;
const immutable_1 = require("immutable");
const index_1 = require("./index");
const defaultNodeRecordProps = {
    id: '',
    name: '',
    description: '',
    type: index_1.NodeType.misc,
    link: '',
    tags: (0, immutable_1.List)(),
    layer: false,
    defaultLayer: false,
    parent: null,
    childrenList: (0, immutable_1.List)(),
    sourcesList: (0, immutable_1.List)(),
    targetsList: (0, immutable_1.List)(),
    geometry: { x: 0, y: 0 },
    metadata: null,
};
const makeNodeRecord = (node) => new NodeRecord({
    id: node.id,
    name: node.name,
    description: node.description,
    type: node.type,
    link: node.link || '',
    tags: (0, immutable_1.List)(node.tags),
    layer: node.layer,
    defaultLayer: node.defaultLayer,
    parent: node.parent ? (0, exports.makeNodeRecord)(node.parent) : null,
    childrenList: (0, immutable_1.List)(node.childrenList.map(exports.makeNodeRecord)),
    sourcesList: (0, immutable_1.List)(node.sourcesList.map(exports.makeNodeRecord)),
    targetsList: (0, immutable_1.List)(node.targetsList.map(exports.makeNodeRecord)),
    geometry: new index_1.GraphPointRecord(node.geometry),
    metadata: node.metadata,
});
exports.makeNodeRecord = makeNodeRecord;
class NodeRecord extends (0, immutable_1.Record)(defaultNodeRecordProps) {
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getType() {
        return this.type;
    }
    getLink() {
        return this.link;
    }
    getTags() {
        return this.tags;
    }
    isLayer() {
        return this.layer;
    }
    isDefaultLayer() {
        return this.defaultLayer;
    }
    getParent() {
        return this.parent;
    }
    getChildren() {
        return this.childrenList;
    }
    getSources() {
        return this.sourcesList;
    }
    getTargets() {
        return this.targetsList;
    }
    getGeometry() {
        return this.geometry;
    }
    getMetadata() {
        return this.metadata;
    }
    withChildren(childrenList) {
        return this.set('childrenList', childrenList);
    }
    withSources(sourcesList) {
        return this.set('sourcesList', sourcesList);
    }
    withTargets(targetsList) {
        return this.set('targetsList', targetsList);
    }
}
exports.NodeRecord = NodeRecord;
