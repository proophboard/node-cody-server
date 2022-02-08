import * as fs from 'fs';
import { CodyResponse } from "@proophboard/cody-types";
export declare const mkdirIfNotExistsSync: (path: string, options?: string | number | fs.MakeDirectoryOptions | null | undefined) => CodyResponse | null;
export declare const writeFileSync: (file: string, content: string, options?: fs.WriteFileOptions | undefined) => CodyResponse | null;
