import { CodyResponse, Node, RawNodeRecordProps } from "@proophboard/cody-types";
import { CodyConfig } from "../config/codyconfig";
export interface ElementEdited {
    node: RawNodeRecordProps;
    context: {
        boardId: string;
        boardName: string;
        userId: string;
    };
}
export declare const handleElementEdited: (node: Node, codyConfig: CodyConfig) => Promise<CodyResponse>;
