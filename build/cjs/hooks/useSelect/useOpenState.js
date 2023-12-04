"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOpenState = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const useOpenState = (props) => {
    const [open, setOpenState] = react_1.default.useState(props.defaultOpen || false);
    const { onOpenChange } = props;
    const isControlled = typeof props.open === 'boolean';
    const openValue = isControlled ? props.open : open;
    const toggleOpen = react_1.default.useCallback((val) => {
        const newOpen = typeof val === 'boolean' ? val : !openValue;
        if (newOpen !== openValue) {
            onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(newOpen);
            if (!isControlled) {
                setOpenState(newOpen);
            }
        }
    }, [openValue, onOpenChange, isControlled]);
    return {
        open: openValue,
        toggleOpen,
    };
};
exports.useOpenState = useOpenState;
