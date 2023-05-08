import { CodyHook, Node, RawNodeRecordProps } from "@proophboard/cody-types";
import { Map } from "immutable";
export interface Sync {
    boardId: string;
    nodes: RawNodeRecordProps[];
}
interface Hooks {
    [hookName: string]: CodyHook;
}
export interface CodyConfig {
    context: {
        [key: string]: unknown;
    } & {
        syncedNodes: Map<string, Node>;
        boardId: string;
        boardName: string;
        userId: string;
    };
    hooks: Hooks;
}
export {};
