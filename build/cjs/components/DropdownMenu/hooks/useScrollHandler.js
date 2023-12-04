"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollHandler = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
function useScrollHandler(onScroll, anchorRef, disabled) {
    react_1.default.useEffect(() => {
        if (disabled) {
            return undefined;
        }
        const handleScroll = (event) => {
            if (event.target.contains(anchorRef.current)) {
                onScroll(event);
            }
        };
        document.addEventListener('scroll', handleScroll, true);
        return () => {
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, [anchorRef, onScroll, disabled]);
}
exports.useScrollHandler = useScrollHandler;
