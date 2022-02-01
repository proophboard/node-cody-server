import { List, Record } from 'immutable';
import {
  GraphPoint,
  Node,
  NodeDescription,
  NodeId,
  NodeLink,
  NodeName,
  NodeRecordProps,
  NodeTag,
  NodeType,
  RawNodeRecordProps
} from './index';
import GraphPointRecord from './GraphPointRecord';

const defaultNodeRecordProps: NodeRecordProps = {
  id: '',
  name: '',
  description: '',
  type: NodeType.misc,
  link: '',
  tags: List(),
  layer: false,
  defaultLayer: false,
  parent: null,
  childrenList: List(),
  sourcesList: List(),
  targetsList: List(),
  geometry: { x: 0, y: 0 },
  metadata: null,
};

export const makeNodeRecord = (node: RawNodeRecordProps): NodeRecord =>
  new NodeRecord({
    id: node.id,
    name: node.name,
    description: node.description,
    type: node.type,
    link: node.link || '',
    tags: List(node.tags),
    layer: node.layer,
    defaultLayer: node.defaultLayer,
    parent: node.parent ? makeNodeRecord(node.parent) : null,
    childrenList: List(node.childrenList.map(makeNodeRecord)),
    sourcesList: List(node.sourcesList.map(makeNodeRecord)),
    targetsList: List(node.targetsList.map(makeNodeRecord)),
    geometry: new GraphPointRecord(node.geometry),
    metadata: node.metadata,
  });

export class NodeRecord extends Record(defaultNodeRecordProps) implements Node {
  public getId(): NodeId {
    return this.id;
  }

  public getName(): NodeName {
    return this.name;
  }

  public getDescription(): NodeDescription {
    return this.description;
  }

  public getType(): NodeType {
    return this.type;
  }

  public getLink(): NodeLink {
    return this.link;
  }

  public getTags(): List<NodeTag> {
    return this.tags;
  }

  public isLayer(): boolean {
    return this.layer;
  }

  public isDefaultLayer(): boolean {
    return this.defaultLayer;
  }

  public getParent(): Node | null {
    return this.parent;
  }

  public getChildren(): List<Node> {
    return this.childrenList;
  }

  public getSources(): List<Node> {
    return this.sourcesList;
  }

  public getTargets(): List<Node> {
    return this.targetsList;
  }

  public getGeometry(): GraphPoint {
    return this.geometry;
  }

  public getMetadata(): string | null {
    return this.metadata;
  }

  public withChildren(childrenList: List<Node>): Node {
    return this.set('childrenList', childrenList);
  }

  public withSources(sourcesList: List<Node>): Node {
    return this.set('sourcesList', sourcesList);
  }

  public withTargets(targetsList: List<Node>): Node {
    return this.set('targetsList', targetsList);
  }
}
