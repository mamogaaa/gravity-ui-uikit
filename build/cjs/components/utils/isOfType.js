"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOfType = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
function isOfType(Component) {
    return function isMatching(component) {
        if (!react_1.default.isValidElement(component)) {
            return false;
        }
        const { type } = component;
        return (type === react_1.default.Component ||
            type.displayName === Component.displayName);
    };
}
exports.isOfType = isOfType;
