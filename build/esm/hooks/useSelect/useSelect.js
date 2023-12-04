import { __rest } from "tslib";
import React from 'react';
import { useOpenState } from './useOpenState';
export const useSelect = (props) => {
    const { value: valueProps, defaultValue = [], multiple, onUpdate } = props;
    const [innerValue, setInnerValue] = React.useState(defaultValue);
    const [activeIndex, setActiveIndex] = React.useState();
    const value = valueProps || innerValue;
    const uncontrolled = !valueProps;
    const _a = useOpenState(props), { toggleOpen } = _a, openState = __rest(_a, ["toggleOpen"]);
    const handleSingleSelection = React.useCallback((option) => {
        if (!value.includes(option.value)) {
            const nextValue = [option.value];
            onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(nextValue);
            if (uncontrolled) {
                setInnerValue(nextValue);
            }
        }
        toggleOpen(false);
    }, [value, uncontrolled, onUpdate, toggleOpen]);
    const handleMultipleSelection = React.useCallback((option) => {
        const alreadySelected = value.includes(option.value);
        const nextValue = alreadySelected
            ? value.filter((iteratedVal) => iteratedVal !== option.value)
            : [...value, option.value];
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(nextValue);
        if (uncontrolled) {
            setInnerValue(nextValue);
        }
    }, [value, uncontrolled, onUpdate]);
    const handleSelection = React.useCallback((option) => {
        if (multiple) {
            handleMultipleSelection(option);
        }
        else {
            handleSingleSelection(option);
        }
    }, [multiple, handleSingleSelection, handleMultipleSelection]);
    const handleClearValue = React.useCallback(() => {
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
