"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVirtualElementRef = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const initialPosition = { top: 0, right: 0, bottom: 0, left: 0 };
// React hook for creating virtual element for popup
function useVirtualElementRef(props = {}) {
    const { rect, contextElement } = props;
    const rectRef = react_1.default.useRef(initialPosition);
    const ref = react_1.default.useRef({
        contextElement,
        getBoundingClientRect() {
            const { top, right, bottom, left } = rectRef.current;
            const width = right - left;
            const height = bottom - top;
            return {
                top,
                right,
                bottom,
                left,
                width,
                height,
            };
        },
    });
    ref.current.contextElement = contextElement;
    if (rect) {
        const { top = 0, left = 0, right = left, bottom = top } = rect;
        rectRef.current = { top, right, bottom, left };
    }
    else {
        rectRef.current = initialPosition;
    }
    return ref;
}
exports.useVirtualElementRef = useVirtualElementRef;
