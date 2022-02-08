import { CodyResponse } from "@proophboard/cody-types";
export declare const isCodyError: (err: any) => err is CodyResponse;
export declare const isCodyWarning: (warning: any) => warning is CodyResponse;
