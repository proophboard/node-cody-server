import { List, Map, Record } from 'immutable';
export type ReplyCallback<T = any> = (reply: T) => Promise<CodyResponse>;
export interface CodyResponse {
    cody: string | string[];
    details?: string | string[];
    type?: CodyResponseType;
    reply?: ReplyCallback;
}
export declare enum CodyResponseType {
    Info = "Info",
    Error = "Error",
    Warning = "Warning",
    Question = "Question",
    SyncRequired = "SyncRequired",
    Empty = "Empty"
}
export type NodeMap = Map<string, Node>;
export type NodeId = string;
export type NodeName = string;
export type NodeDescription = string;
export type NodeLink = string;
export type NodeTag = string;
export declare enum NodeType {
    event = "event",
    command = "command",
    role = "role",
    aggregate = "aggregate",
    document = "document",
    policy = "policy",
    hotSpot = "hotSpot",
    externalSystem = "externalSystem",
    ui = "ui",
    feature = "feature",
    boundedContext = "boundedContext",
    freeText = "freeText",
    textCard = "textCard",
    edge = "edge",
    misc = "misc",
    icon = "icon",
    image = "image",
    layer = "layer"
}
export type CodyHook<T = any> = (node: Node, context: T) => Promise<CodyResponse>;
export interface GraphPoint {
    x: number;
    y: number;
}
declare const GraphPointRecord_base: Record.Factory<{
    x: number;
    y: number;
}>;
export declare class GraphPointRecord extends GraphPointRecord_base implements GraphPoint {
}
export interface Node {
    getId: () => NodeId;
    getName: () => NodeName;
    getDescription: () => NodeDescription;
    getType: () => NodeType;
    getLink: () => NodeLink;
    getTags: () => List<NodeTag>;
    isLayer: () => boolean;
    isDefaultLayer: () => boolean;
    getParent: () => Node | null;
    getChildren: () => List<Node>;
    getGeometry: () => GraphPoint;
    getSources: () => List<Node>;
    getTargets: () => List<Node>;
    getMetadata: () => string | null;
    withChildren: (childrenList: List<Node>) => Node;
    withSources: (sourcesList: List<Node>) => Node;
    withTargets: (targetsList: List<Node>) => Node;
}
export interface RawNodeRecordProps {
    id: NodeId;
    name: NodeName;
    description: NodeDescription;
    type: NodeType;
    link: NodeLink | null;
    tags: NodeTag[];
    layer: boolean;
    defaultLayer: boolean;
    parent: RawNodeRecordProps | null;
    childrenList: RawNodeRecordProps[];
    sourcesList: RawNodeRecordProps[];
    targetsList: RawNodeRecordProps[];
    geometry: GraphPoint;
    metadata: string | null;
}
export interface NodeRecordProps {
    id: NodeId;
    name: NodeName;
    description: NodeDescription;
    type: NodeType;
    link: NodeLink;
    tags: List<NodeTag>;
    layer: boolean;
    defaultLayer: boolean;
    parent: Node | null;
    childrenList: List<Node>;
    sourcesList: List<Node>;
    targetsList: List<Node>;
    geometry: GraphPoint;
    metadata: string | null;
}
export { makeNodeRecord } from "./NodeRecord";
export { NodeRecord } from "./NodeRecord";
