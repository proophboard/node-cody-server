import { CodyResponse } from "@proophboard/cody-types";
export declare type EmitResponse = (res: CodyResponse) => void;
export declare type ReplyCallback<T = any> = (reply: T) => Promise<CodyResponse>;
