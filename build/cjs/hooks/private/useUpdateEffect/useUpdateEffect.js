"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdateEffect = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const useUpdateEffect = (effect, deps) => {
    const isInitial = react_1.default.useRef(true);
    react_1.default.useEffect(() => {
        if (isInitial.current) {
            isInitial.current = false;
            return;
        }
        effect();
    }, deps);
};
exports.useUpdateEffect = useUpdateEffect;
