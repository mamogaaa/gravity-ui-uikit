"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modsClassName = exports.blockNew = exports.block = exports.cn = exports.NAMESPACE_NEW = exports.NAMESPACE = void 0;
const classname_1 = require("@bem-react/classname");
exports.NAMESPACE = 'yc-';
exports.NAMESPACE_NEW = 'g-';
exports.cn = (0, classname_1.withNaming)({ e: '__', m: '_' });
exports.block = (0, classname_1.withNaming)({ n: exports.NAMESPACE, e: '__', m: '_' });
exports.blockNew = (0, classname_1.withNaming)({ n: exports.NAMESPACE_NEW, e: '__', m: '_' });
/**
 * Extracts modifiers part from className
 */
function modsClassName(className) {
    return className.split(/\s(.*)/)[1];
}
exports.modsClassName = modsClassName;
