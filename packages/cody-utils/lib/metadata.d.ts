import { CodyResponse, Node } from "@proophboard/cody-types";
export declare const parseJsonMetadata: <T>(node: Node) => T | CodyResponse;
export declare const getStringMetadata: (node: Node) => string | CodyResponse;
