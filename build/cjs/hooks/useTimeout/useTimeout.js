"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimeout = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
function useTimeout(callback, ms) {
    react_1.default.useEffect(() => {
        if (typeof ms !== 'number') {
            return undefined;
        }
        const timer = setTimeout(() => {
            callback();
        }, ms);
        return () => {
            clearTimeout(timer);
        };
    }, [callback, ms]);
}
exports.useTimeout = useTimeout;
