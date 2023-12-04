"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useListNavigation = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const moveBack_1 = require("./moveBack");
const moveForward_1 = require("./moveForward");
function useListNavigation({ items, skip, pageSize, processHomeKey = true, processEndKey = true, anchorRef, disabled = false, initialValue = -1, onAnchorKeyDown, }) {
    const [activeItemIndex, setActiveItemIndex] = react_1.default.useState(initialValue);
    const reset = react_1.default.useCallback(() => {
        setActiveItemIndex(initialValue);
    }, [initialValue]);
    react_1.default.useEffect(() => {
        if (items) {
            reset();
        }
    }, [items, reset]);
    react_1.default.useLayoutEffect(() => {
        if (disabled) {
            return undefined;
        }
        const canNavigate = items.some((item) => !(skip === null || skip === void 0 ? void 0 : skip(item)));
        if (!canNavigate) {
            return undefined;
        }
        const anchor = anchorRef === null || anchorRef === void 0 ? void 0 : anchorRef.current;
        if (!anchor) {
            return undefined;
        }
        const handleKeyDown = (event) => {
            const shouldProcessKeydown = onAnchorKeyDown === null || onAnchorKeyDown === void 0 ? void 0 : onAnchorKeyDown(activeItemIndex, event);
            if (shouldProcessKeydown === false) {
                return;
            }
            switch (event.key) {
                case 'ArrowDown': {
                    event.preventDefault();
                    // Go 1 step forward
                    setActiveItemIndex((previousActiveItemIndex) => (0, moveForward_1.moveForward)(items, previousActiveItemIndex, 1, skip));
                    break;
                }
                case 'ArrowUp': {
                    event.preventDefault();
                    // Go 1 step back
                    setActiveItemIndex((previousActiveItemIndex) => (0, moveBack_1.moveBack)(items, previousActiveItemIndex, 1, skip));
                    break;
                }
                case 'PageDown': {
                    if (!pageSize) {
                        return;
                    }
                    event.preventDefault();
                    // Go pageSize steps forward
                    setActiveItemIndex((previousActiveItemIndex) => (0, moveForward_1.moveForward)(items, previousActiveItemIndex, pageSize, skip));
                    break;
                }
                case 'PageUp': {
                    if (!pageSize) {
                        return;
                    }
                    event.preventDefault();
                    // Go pageSize steps back
                    setActiveItemIndex((previousActiveItemIndex) => (0, moveBack_1.moveBack)(items, previousActiveItemIndex, pageSize, skip));
                    break;
                }
                case 'Home': {
                    if (!processHomeKey) {
                        return;
                    }
                    event.preventDefault();
                    // Go to the start of the list
                    setActiveItemIndex((previousActiveItemIndex) => (0, moveBack_1.moveBack)(items, previousActiveItemIndex, previousActiveItemIndex, skip));
                    break;
                }
                case 'End': {
                    if (!processEndKey) {
                        return;
                    }
                    event.preventDefault();
                    // Go to the end of the list
                    setActiveItemIndex((previousActiveItemIndex) => (0, moveBack_1.moveBack)(items, previousActiveItemIndex, previousActiveItemIndex + 1, skip));
                    break;
                }
            }
        };
        anchor.addEventListener('keydown', handleKeyDown);
        return () => {
            anchor.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        activeItemIndex,
        anchorRef,
        disabled,
        items,
        onAnchorKeyDown,
        pageSize,
        processEndKey,
        processHomeKey,
        skip,
    ]);
    return {
        activeItemIndex,
        setActiveItemIndex,
        reset,
    };
}
exports.useListNavigation = useListNavigation;
