"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInToasterContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const ToasterContext_1 = require("../Provider/ToasterContext");
function useInToasterContext() {
    return react_1.default.useContext(ToasterContext_1.ToasterContext) !== null;
}
exports.useInToasterContext = useInToasterContext;
