import { JSONSchema } from "json-schema-to-typescript";
import { CodyResponse } from "@proophboard/cody-types";
export declare const COMPILE_OPTIONS: {
    style: {
        tabWidth: number;
    };
    declareExternallyReferenced: boolean;
    bannerComment: string;
};
export interface SchemaDefinitions {
    sourceMap: {
        [defName: string]: string;
    };
    definitions: {
        [defName: string]: JSONSchema;
    };
}
export declare const compileSchema: (schema: JSONSchema, schemaName: string, sourcePath: string, defs: SchemaDefinitions, additionalContent?: string) => Promise<string>;
export declare const NAMESPACE = "namespace";
export declare const removeNamespace: (ref: string) => string;
export declare const isRootNamespace: (ref: string) => boolean;
export interface ShorthandObject {
    [property: string]: ShorthandObject | string;
}
export interface ShorthandObjectWithDefault {
    $default?: any;
    [property: string]: ShorthandObject | string;
}
export declare const convertShorthandObjectToJsonSchema: (shorthand: ShorthandObjectWithDefault, namespace?: string) => JSONSchema | CodyResponse;
export declare const convertShorthandStringToJsonSchema: (shorthand: string, namespace: string) => JSONSchema | CodyResponse;
export declare const parseShorthandValidation: (validation: string) => [
    string,
    string | number | boolean | {
        $data: string;
    }
] | CodyResponse;
export declare const dereferenceSchema: (schema: JSONSchema, defs: SchemaDefinitions) => Promise<JSONSchema>;
export declare const relativeImportPath: (sourcePath: string, refSource: string) => string;
export declare const isArrayType: (def: string, defs: SchemaDefinitions) => boolean;
export declare const isStateType: (def: string, defs: SchemaDefinitions) => Promise<boolean>;
export declare const mapPropertiesToTitles: (schema: JSONSchema, property?: string) => JSONSchema;
export declare const definitionsContainReference: (ref: string, defs: SchemaDefinitions) => boolean;
export declare const getSchemaFromDefinitions: (def: string, defs: SchemaDefinitions) => JSONSchema | null;
