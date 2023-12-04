"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelect = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const useOpenState_1 = require("./useOpenState");
const useSelect = (props) => {
    const { value: valueProps, defaultValue = [], multiple, onUpdate } = props;
    const [innerValue, setInnerValue] = react_1.default.useState(defaultValue);
    const [activeIndex, setActiveIndex] = react_1.default.useState();
    const value = valueProps || innerValue;
    const uncontrolled = !valueProps;
    const _a = (0, useOpenState_1.useOpenState)(props), { toggleOpen } = _a, openState = tslib_1.__rest(_a, ["toggleOpen"]);
    const handleSingleSelection = react_1.default.useCallback((option) => {
        if (!value.includes(option.value)) {
            const nextValue = [option.value];
            onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(nextValue);
            if (uncontrolled) {
                setInnerValue(nextValue);
            }
        }
        toggleOpen(false);
    }, [value, uncontrolled, onUpdate, toggleOpen]);
    const handleMultipleSelection = react_1.default.useCallback((option) => {
        const alreadySelected = value.includes(option.value);
        const nextValue = alreadySelected
            ? value.filter((iteratedVal) => iteratedVal !== option.value)
            : [...value, option.value];
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(nextValue);
        if (uncontrolled) {
            setInnerValue(nextValue);
        }
    }, [value, uncontrolled, onUpdate]);
    const handleSelection = react_1.default.useCallback((option) => {
        if (multiple) {
            handleMultipleSelection(option);
        }
        else {
            handleSingleSelection(option);
        }
    }, [multiple, handleSingleSelection, handleMultipleSelection]);
    const handleClearValue = react_1.default.useCallback(() => {
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate([]);
        setInnerValue([]);
    }, [onUpdate]);
    return Object.assign({ value,
        activeIndex,
        handleSelection,
        handleClearValue, 
        /**
         * @deprecated use toggleOpen
         */
        setOpen: toggleOpen, toggleOpen,
        setActiveIndex }, openState);
};
exports.useSelect = useSelect;
