"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOutsideClick = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
/**
 * Hook for observing clicks outside a given target
 *
 * @param ref - purpose of observation
 * @param handler - callback when a click is triggered outside the observation target
 *
 * @return - nothing
 */
const useOutsideClick = ({ ref, handler }) => {
    react_1.default.useEffect(() => {
        const callback = (e) => {
            const elem = ref === null || ref === void 0 ? void 0 : ref.current;
            if (elem && !elem.contains(e.target) && handler) {
                handler();
            }
        };
        window.addEventListener('mouseup', callback, { capture: true });
        window.addEventListener('touchend', callback, { capture: true });
        return () => {
            window.removeEventListener('mouseup', callback, { capture: true });
            window.removeEventListener('touchend', callback, { capture: true });
        };
    }, [handler, ref]);
};
exports.useOutsideClick = useOutsideClick;
