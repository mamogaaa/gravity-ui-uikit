import React from 'react';
import { ChevronDown } from '@gravity-ui/icons';
import isEmpty from 'lodash/isEmpty';
import { Icon } from '../../../Icon';
import { selectControlBlock, selectControlButtonBlock } from '../../constants';
import { SelectClear } from '../SelectClear/SelectClear';
import './SelectControl.css';
export const SelectControl = React.forwardRef((props, ref) => {
    const { toggleOpen, clearValue, onKeyDown, renderControl, view, size, pin, selectedOptionsContent, className, qa, name, label, placeholder, error, open, disabled, value, hasClear, popupId, selectId, activeIndex, } = props;
    const showOptionsText = Boolean(selectedOptionsContent);
    const showPlaceholder = Boolean(placeholder && !showOptionsText);
    const hasValue = Array.isArray(value) && !isEmpty(value.filter(Boolean));
    const [isDisabledButtonAnimation, setIsDisabledButtonAnimation] = React.useState(false);
    const controlMods = {
        open,
        size,
        pin,
        disabled,
        error: Boolean(error),
        'has-clear': hasClear,
        'no-active': isDisabledButtonAnimation,
        'has-value': hasValue,
    };
    const buttonMods = {
        open,
        size,
        view,
        pin,
        disabled,
        error: Boolean(error),
    };
    const disableButtonAnimation = React.useCallback(() => {
        setIsDisabledButtonAnimation(true);
    }, []);
    const enableButtonAnimation = React.useCallback(() => {
        setIsDisabledButtonAnimation(false);
    }, []);
    const handleOnClearIconClick = React.useCallback(() => {
        // return animation on clear click
        setIsDisabledButtonAnimation(false);
        clearValue();
    }, [clearValue]);
    const renderClearIcon = (args) => {
        const hideOnEmpty = !(value === null || value === void 0 ? void 0 : value[0]);
        if (!hasClear || !clearValue || hideOnEmpty || disabled) {
            return null;
        }
        return (React.createElement(SelectClear, { size: size, onClick: handleOnClearIconClick, onMouseEnter: disableButtonAnimation, onMouseLeave: enableButtonAnimation, renderIcon: args.renderIcon }));
    };
    if (renderControl) {
        return renderControl({
            onKeyDown,
            onClear: clearValue,
            onClick: toggleOpen,
            renderClear: (arg) => renderClearIcon(arg),
            ref,
            open: Boolean(open),
            popupId,
            selectId,
            activeIndex,
        }, { value });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: selectControlBlock(controlMods), role: "group" },
            React.createElement("button", { ref: ref, role: "combobox", "aria-controls": popupId, className: selectControlButtonBlock(buttonMods, className), "aria-haspopup": "listbox", "aria-expanded": open, "aria-activedescendant": activeIndex === undefined
                    ? undefined
                    : `${selectId}-list-item-${activeIndex}`, name: name, disabled: disabled, onClick: toggleOpen, onKeyDown: onKeyDown, type: "button", "data-qa": qa },
                label && React.createElement("span", { className: selectControlBlock('label') }, label),
                showPlaceholder && (React.createElement("span", { className: selectControlBlock('placeholder') }, placeholder)),
                showOptionsText && (React.createElement("span", { className: selectControlBlock('option-text') }, selectedOptionsContent))),
            renderClearIcon({}),
            React.createElement(Icon, { className: selectControlBlock('chevron-icon', { disabled }), data: ChevronDown, "aria-hidden": "true" })),
        typeof error === 'string' && (React.createElement("div", { className: selectControlBlock('error') }, error))));
});
SelectControl.displayName = 'SelectControl';
