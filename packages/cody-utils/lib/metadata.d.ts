import { CodyResponse, Node } from "@proophboard/cody-types";
export declare const parseJsonMetadata: <T>(node: Node) => [T | null, CodyResponse | undefined];
export declare const getStringMetadata: (node: Node) => [string | null, CodyResponse | undefined];
