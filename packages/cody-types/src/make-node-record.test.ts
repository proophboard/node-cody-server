import {makeNodeRecord} from "./NodeRecord";
import {NodeType, RawNodeRecordProps} from "./index";

const rawNode: RawNodeRecordProps = {
  id: "1234",
  name: "Test Me",
  type: NodeType.command,
  tags: [],
  metadata: null,
  childrenList: [],
  defaultLayer: false,
  parent: null,
  description: "A test command",
  geometry: {x: 10, y: 23},
  layer: false,
  link: "https://app.prooph-board.com",
  sourcesList: [],
  targetsList: []
}

test("It makes node from raw data", () => {
  const node = makeNodeRecord(rawNode);

  expect(node.name).toEqual('Test Me')
  expect(node.type).toEqual(NodeType.command)
})

test("It uses name from metadata if present", () => {
  const node = makeNodeRecord({...rawNode, metadata: JSON.stringify({$nodeName: "Me Again"})});

  expect(node.name).toEqual('Me Again')
  expect(node.type).toEqual(NodeType.command)
})

test("It uses type from metadata if present", () => {
  const node = makeNodeRecord({...rawNode, metadata: JSON.stringify({$nodeType: NodeType.event})});

  expect(node.name).toEqual('Test Me')
  expect(node.type).toEqual(NodeType.event)
})
