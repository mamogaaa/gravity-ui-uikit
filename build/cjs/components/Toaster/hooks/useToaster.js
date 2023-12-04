"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToaster = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const ToasterContext_1 = require("../Provider/ToasterContext");
function useToaster() {
    const toaster = react_1.default.useContext(ToasterContext_1.ToasterContext);
    if (toaster === null) {
        throw new Error('Toaster: `useToaster` hook is used out of context');
    }
    return react_1.default.useMemo(() => toaster, [toaster]);
}
exports.useToaster = useToaster;
