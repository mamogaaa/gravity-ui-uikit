"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useElementSize = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const round_1 = tslib_1.__importDefault(require("lodash/round"));
const throttle_1 = tslib_1.__importDefault(require("lodash/throttle"));
const RESIZE_THROTTLE = 16;
const ROUND_PRESICION = 2;
function useElementSize(ref, 
// can be used, when it is needed to force reassign observer to element
// in order to get correct measures. might be related to below
// https://github.com/WICG/resize-observer/issues/65
key) {
    const [size, setSize] = react_1.default.useState({
        width: 0,
        height: 0,
    });
    react_1.default.useLayoutEffect(() => {
        if (!(ref === null || ref === void 0 ? void 0 : ref.current)) {
            return undefined;
        }
        const handleResize = (entries) => {
            if (!Array.isArray(entries)) {
                return;
            }
            const entry = entries[0];
            if (entry.borderBoxSize) {
                const borderBoxSize = entry.borderBoxSize[0]
                    ? entry.borderBoxSize[0]
                    : entry.borderBoxSize;
                // ...but old versions of Firefox treat it as a single item
                // https://github.com/mdn/dom-examples/blob/main/resize-observer/resize-observer-text.html#L88
                setSize({
                    width: (0, round_1.default)(borderBoxSize.inlineSize, ROUND_PRESICION),
                    height: (0, round_1.default)(borderBoxSize.blockSize, ROUND_PRESICION),
                });
            }
            else {
                const target = entry.target;
                setSize({
                    width: (0, round_1.default)(target.offsetWidth, ROUND_PRESICION),
                    height: (0, round_1.default)(target.offsetHeight, ROUND_PRESICION),
                });
            }
        };
        const observer = new ResizeObserver((0, throttle_1.default)(handleResize, RESIZE_THROTTLE));
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    }, [ref, key]);
    return size;
}
exports.useElementSize = useElementSize;
