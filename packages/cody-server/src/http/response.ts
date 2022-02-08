import {CodyResponse} from "@proophboard/cody-types";

export type EmitResponse = (res: CodyResponse) => void;

export type ReplyCallback<T = any> = (reply: T) => Promise<CodyResponse>;
