import { List, Record } from 'immutable';
import { GraphPoint, Node, NodeDescription, NodeId, NodeLink, NodeName, NodeRecordProps, NodeTag, NodeType, RawNodeRecordProps } from './index';
export declare const makeNodeRecord: (node: RawNodeRecordProps) => NodeRecord;
declare const NodeRecord_base: Record.Factory<NodeRecordProps>;
export declare class NodeRecord extends NodeRecord_base implements Node {
    getId(): NodeId;
    getName(): NodeName;
    getDescription(): NodeDescription;
    getType(): NodeType;
    getLink(): NodeLink;
    getTags(): List<NodeTag>;
    isLayer(): boolean;
    isDefaultLayer(): boolean;
    getParent(): Node | null;
    getChildren(): List<Node>;
    getSources(): List<Node>;
    getTargets(): List<Node>;
    getGeometry(): GraphPoint;
    getMetadata(): string | null;
    withChildren(childrenList: List<Node>): Node;
    withSources(sourcesList: List<Node>): Node;
    withTargets(targetsList: List<Node>): Node;
}
export {};
