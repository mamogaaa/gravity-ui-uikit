"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIntersection = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const useIntersection = ({ element, options, onIntersect }) => {
    react_1.default.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntersect === null || onIntersect === void 0 ? void 0 : onIntersect();
            }
        }, options);
        if (element) {
            observer.observe(element);
        }
        return () => (element === null ? undefined : observer.unobserve(element));
    }, [element, options, onIntersect]);
};
exports.useIntersection = useIntersection;
