"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHover = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
function useHover() {
    const [isHovering, setIsHovering] = react_1.default.useState(false);
    const onMouseEnter = react_1.default.useCallback(() => {
        setIsHovering(true);
    }, []);
    const onMouseLeave = react_1.default.useCallback(() => {
        setIsHovering(false);
    }, []);
    return [onMouseEnter, onMouseLeave, isHovering];
}
exports.useHover = useHover;
