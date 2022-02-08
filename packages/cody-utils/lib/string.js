"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ucWord = exports.lcWord = exports.snakeCaseToCamelCase = exports.nodeNameToSnakeCase = exports.camelCaseToTitle = exports.nodeNameToPascalCase = exports.nodeNameToCamelCase = void 0;
const camel_case_1 = require("camel-case");
const nodeNameToCamelCase = (node) => {
    const nodeName = typeof node === 'string' ? node : node.getName();
    const name = (0, camel_case_1.camelCase)(nodeName.split(' ').join('-'));
    return name.charAt(0).toLowerCase() + name.slice(1);
};
exports.nodeNameToCamelCase = nodeNameToCamelCase;
const nodeNameToPascalCase = (node) => {
    const nodeName = typeof node === 'string' ? node : node.getName();
    const name = (0, camel_case_1.camelCase)(nodeName.split(' ').join('-'));
    return name.charAt(0).toUpperCase() + name.slice(1);
};
exports.nodeNameToPascalCase = nodeNameToPascalCase;
const camelCaseToTitle = (str) => {
    str = str.replace(/([A-Z](?=[A-Z][a-z])|[^A-Z](?=[A-Z])|[a-zA-Z](?=[^a-zA-Z]))/g, '$1 ');
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.camelCaseToTitle = camelCaseToTitle;
const nodeNameToSnakeCase = (node) => {
    const nodeName = typeof node === 'string' ? node : node.getName();
    if (nodeName === '') {
        return '';
    }
    let name = nodeName.split(' ').join('_').split('-').join('_');
    name = name[0].toLowerCase() + name.slice(1).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    return name.split('__').join('_');
};
exports.nodeNameToSnakeCase = nodeNameToSnakeCase;
const snakeCaseToCamelCase = (str) => {
    if (str === '') {
        return str;
    }
    str = str.split('_').map(part => part.length > 0 ? part[0].toUpperCase() + part.slice(1) : '').join('');
    return str[0].toLowerCase() + str.slice(1);
};
exports.snakeCaseToCamelCase = snakeCaseToCamelCase;
const lcWord = (word) => {
    if (word.length === 0) {
        return word;
    }
    return word.charAt(0).toLowerCase() + word.slice(1);
};
exports.lcWord = lcWord;
const ucWord = (word) => {
    if (word.length === 0) {
        return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
};
exports.ucWord = ucWord;
