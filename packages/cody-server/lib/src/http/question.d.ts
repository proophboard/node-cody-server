import { CodyResponse } from "@proophboard/cody-types";
export interface Reply {
    reply: any;
}
export declare const checkQuestion: (res: CodyResponse) => CodyResponse;
export declare const handleReply: (reply: any) => Promise<CodyResponse>;
export declare const test: () => CodyResponse;
