import { CodyResponse, Node, RawNodeRecordProps } from "@proophboard/cody-types";
import { CodyConfig } from "../config/codyconfig";
export interface ElementEdited {
    node: RawNodeRecordProps;
}
export declare const handleElementEdited: (node: Node, codyConfig: CodyConfig) => Promise<CodyResponse>;
