import { CodyResponse, Node } from "@proophboard/cody-types";
export declare const parseJsonMetadata: <T>(node: Node) => CodyResponse | T;
export declare const getStringMetadata: (node: Node) => string | CodyResponse;
