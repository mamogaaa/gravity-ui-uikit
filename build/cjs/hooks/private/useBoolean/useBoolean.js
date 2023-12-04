"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBoolean = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
function useBoolean(initialState) {
    const [value, setValue] = react_1.default.useState(initialState);
    return [
        value,
        react_1.default.useCallback(() => setValue(true), []),
        react_1.default.useCallback(() => setValue(false), []),
        react_1.default.useCallback(() => setValue((val) => !val), []),
    ];
}
exports.useBoolean = useBoolean;
