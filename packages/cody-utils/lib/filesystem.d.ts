import { MakeDirectoryOptions, WriteFileOptions } from 'fs';
import { CodyResponse } from "@proophboard/cody-types";
export declare const mkdirIfNotExistsSync: (path: string, options?: number | string | MakeDirectoryOptions | null) => CodyResponse | null;
export declare const writeFileSync: (file: string, content: string, options?: WriteFileOptions) => CodyResponse | null;
