"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForkRef = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const setRef_1 = require("./setRef");
function useForkRef(...refs) {
    return react_1.default.useMemo(() => {
        if (refs.every((ref) => ref === null || ref === undefined)) {
            return null;
        }
        return (value) => {
            for (const ref of refs) {
                (0, setRef_1.setRef)(ref, value);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs);
}
exports.useForkRef = useForkRef;
