"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeWithSimilarNodes = exports.getAbsoluteGraphPoint = exports.getTargetsOfTypeWithParentLookup = exports.getSourcesOfTypeWithParentLookup = exports.getTargetsOfType = exports.getSourcesOfType = exports.getSingleSourceFromSyncedNodes = exports.getSingleSource = exports.getSingleTarget = void 0;
const immutable_1 = require("immutable");
const cody_types_1 = require("@proophboard/cody-types");
const response_1 = require("./response");
const getSingleTarget = (node, expectedType) => {
    const targets = node.getTargets().filter(t => t.getType() === expectedType);
    if (targets.count() === 0) {
        return {
            cody: `Looking for a "${expectedType}" as a target of "${node.getName()}", but there is non connected.`,
            details: `Check your design. Cannot proceed without a ${expectedType}`,
            type: cody_types_1.CodyResponseType.Error
        };
    }
    if (targets.count() > 1) {
        return {
            cody: `Looking for a single "${expectedType}" as a target of "${node.getName()}", but there are multiple connected.`,
            details: `Not sure what you've planned? But I cannot handle it this way, sorry.`,
            type: cody_types_1.CodyResponseType.Error
        };
    }
    return node.getTargets().first();
};
exports.getSingleTarget = getSingleTarget;
const getSingleSource = (node, expectedType) => {
    const sources = node.getSources().filter(t => t.getType() === expectedType);
    if (sources.count() === 0) {
        return {
            cody: `Looking for a "${expectedType}" as a source of "${node.getName()}", but there is non connected.`,
            details: `I'd love to, but I cannot proceed without a ${expectedType}`,
            type: cody_types_1.CodyResponseType.Error
        };
    }
    if (sources.count() > 1) {
        return {
            cody: `Looking for a single "${expectedType}" as a source of "${node.getName()}", but there are multiple connected.`,
            details: `You could teach me to handle the situation. But at the moment I can't, sorry.`,
            type: cody_types_1.CodyResponseType.Error
        };
    }
    return sources.first();
};
exports.getSingleSource = getSingleSource;
const getSingleSourceFromSyncedNodes = (node, expectedType, syncedNodes) => {
    const source = (0, exports.getSingleSource)(node, expectedType);
    if ((0, response_1.isCodyError)(source)) {
        return source;
    }
    const filteredNodes = syncedNodes.filter(otherNode => otherNode.getId() === source.getId());
    if (filteredNodes.count() === 1) {
        return filteredNodes.first();
    }
    return {
        cody: `Tried to find source ${source.getId()} of type ${expectedType.toString()} in list of synced nodes. But it is not there.`,
        details: `It's the source of node ${node.getName()}. Name of the source is ${source.getName()}. Try a reconnect to trigger sync again!`,
        type: cody_types_1.CodyResponseType.Error
    };
};
exports.getSingleSourceFromSyncedNodes = getSingleSourceFromSyncedNodes;
const getSourcesOfType = (node, expectedType, ignoreOthers = false, includeChildren = false, allowEmpty = false) => {
    let sources = node.getSources().filter(t => t.getType() === expectedType);
    if (sources.count() !== node.getSources().count() && !ignoreOthers) {
        return {
            cody: `Only "${expectedType}" is a valid source for "${node.getName()}", but there seem to be other card types connected.`,
            details: `You might have a second look at it?`,
            type: cody_types_1.CodyResponseType.Error
        };
    }
    if (includeChildren) {
        node.getChildren().forEach(child => {
            sources = sources.push(...child.getSources().filter(t => t.getType() === expectedType));
        });
    }
    if (sources.count() === 0 && !allowEmpty) {
        return {
            cody: `Looking for a "${expectedType}" as a source of "${node.getName()}", but there is non connected.`,
            details: `I'd love to, but I cannot proceed without a ${expectedType}`,
            type: cody_types_1.CodyResponseType.Error
        };
    }
    return sources;
};
exports.getSourcesOfType = getSourcesOfType;
const getTargetsOfType = (node, expectedType, ignoreOthers = false, includeChildren = false, allowEmpty = false) => {
    let targets = node.getTargets().filter(t => t.getType() === expectedType);
    if (targets.count() !== node.getTargets().count() && !ignoreOthers) {
        return {
            cody: `Only "${expectedType}" is a valid target for "${node.getName()}", but there seem to be other card types connected.`,
            details: `You might have a second look at it?`,
            type: cody_types_1.CodyResponseType.Error
        };
    }
    if (includeChildren) {
        node.getChildren().forEach(child => {
            targets = targets.push(...child.getTargets().filter(t => t.getType() === expectedType));
        });
    }
    if (targets.count() === 0 && !allowEmpty) {
        return {
            cody: `Looking for a "${expectedType}" as a target of "${node.getName()}", but there is non connected.`,
            details: `I'd love to, but I cannot proceed without a ${expectedType}`,
            type: cody_types_1.CodyResponseType.Error
        };
    }
    return targets;
};
exports.getTargetsOfType = getTargetsOfType;
const getSourcesOfTypeWithParentLookup = (node, expectedType) => {
    let sources = (0, immutable_1.List)();
    for (const source of node.getSources()) {
        if (source.getType() === expectedType) {
            sources = sources.push(source);
        }
        else {
            const parent = source.getParent();
            if (parent && parent.getType() === expectedType) {
                sources = sources.push(parent);
            }
        }
    }
    return sources;
};
exports.getSourcesOfTypeWithParentLookup = getSourcesOfTypeWithParentLookup;
const getTargetsOfTypeWithParentLookup = (node, expectedType) => {
    let targets = (0, immutable_1.List)();
    for (const target of node.getTargets()) {
        if (target.getType() === expectedType) {
            targets = targets.push(target);
        }
        else {
            const parent = target.getParent();
            if (parent && parent.getType() === expectedType) {
                targets = targets.push(parent);
            }
        }
    }
    return targets;
};
exports.getTargetsOfTypeWithParentLookup = getTargetsOfTypeWithParentLookup;
const getAbsoluteGraphPoint = (node, calculatedChildGraphPoint) => {
    if (!calculatedChildGraphPoint) {
        calculatedChildGraphPoint = node.getGeometry();
    }
    const parent = node.getParent();
    if (!parent) {
        return calculatedChildGraphPoint;
    }
    if (parent.getType() === cody_types_1.NodeType.layer) {
        return calculatedChildGraphPoint;
    }
    return (0, exports.getAbsoluteGraphPoint)(parent, new cody_types_1.GraphPointRecord({
        x: parent.getGeometry().x + calculatedChildGraphPoint.x,
        y: parent.getGeometry().y + calculatedChildGraphPoint.y
    }));
};
exports.getAbsoluteGraphPoint = getAbsoluteGraphPoint;
const mergeWithSimilarNodes = (node, otherNodes) => {
    let filteredNodes = otherNodes.filter(otherNode => otherNode.getType() === node.getType()
        && otherNode.getName() === node.getName()
        && otherNode.getId() !== node.getId()).toList();
    if (filteredNodes.count() === 0) {
        return node;
    }
    filteredNodes = filteredNodes.push(node)
        .sort((nodeA, nodeB) => {
        const absoluteGeoNodeA = (0, exports.getAbsoluteGraphPoint)(nodeA);
        const absoluteGeoNodeB = (0, exports.getAbsoluteGraphPoint)(nodeB);
        return absoluteGeoNodeA.x < absoluteGeoNodeB.x ? -1 : absoluteGeoNodeA.x > absoluteGeoNodeB.x ? 1 : 0;
    });
    let firstNode = filteredNodes.first();
    filteredNodes = filteredNodes.shift();
    filteredNodes.forEach(similarNode => {
        let nodeChildren = firstNode.getChildren();
        similarNode.getChildren().forEach(child => {
            const alreadyChild = nodeChildren.find(nodeChild => nodeChild.getId() === child.getId());
            if (!alreadyChild) {
                nodeChildren = nodeChildren.push(child);
            }
        });
        firstNode = firstNode.withChildren(nodeChildren);
        let nodeSources = firstNode.getSources();
        similarNode.getSources().forEach(source => {
            const alreadySource = nodeSources.find(nodeSource => nodeSource.getId() === source.getId());
            if (!alreadySource) {
                nodeSources = nodeSources.push(source);
            }
        });
        firstNode = firstNode.withSources(nodeSources);
        let nodeTargets = firstNode.getTargets();
        similarNode.getTargets().forEach(target => {
            const alreadyTarget = nodeTargets.find(nodeTarget => nodeTarget.getId() === target.getId());
            if (!alreadyTarget) {
                nodeTargets = nodeTargets.push(target);
            }
        });
        firstNode = firstNode.withTargets(nodeTargets);
    });
    return node.withChildren(firstNode.getChildren()).withSources(firstNode.getSources()).withTargets(firstNode.getTargets());
};
exports.mergeWithSimilarNodes = mergeWithSimilarNodes;
