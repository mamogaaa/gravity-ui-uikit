"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectControl = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const isEmpty_1 = tslib_1.__importDefault(require("lodash/isEmpty"));
const Icon_1 = require("../../../Icon");
const constants_1 = require("../../constants");
const SelectClear_1 = require("../SelectClear/SelectClear");
exports.SelectControl = react_1.default.forwardRef((props, ref) => {
    const { toggleOpen, clearValue, onKeyDown, renderControl, view, size, pin, selectedOptionsContent, className, qa, name, label, placeholder, error, open, disabled, value, hasClear, popupId, selectId, activeIndex, } = props;
    const showOptionsText = Boolean(selectedOptionsContent);
    const showPlaceholder = Boolean(placeholder && !showOptionsText);
    const hasValue = Array.isArray(value) && !(0, isEmpty_1.default)(value.filter(Boolean));
    const [isDisabledButtonAnimation, setIsDisabledButtonAnimation] = react_1.default.useState(false);
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
    const disableButtonAnimation = react_1.default.useCallback(() => {
        setIsDisabledButtonAnimation(true);
    }, []);
    const enableButtonAnimation = react_1.default.useCallback(() => {
        setIsDisabledButtonAnimation(false);
    }, []);
    const handleOnClearIconClick = react_1.default.useCallback(() => {
        // return animation on clear click
        setIsDisabledButtonAnimation(false);
        clearValue();
    }, [clearValue]);
    const renderClearIcon = (args) => {
        const hideOnEmpty = !(value === null || value === void 0 ? void 0 : value[0]);
        if (!hasClear || !clearValue || hideOnEmpty || disabled) {
            return null;
        }
        return (react_1.default.createElement(SelectClear_1.SelectClear, { size: size, onClick: handleOnClearIconClick, onMouseEnter: disableButtonAnimation, onMouseLeave: enableButtonAnimation, renderIcon: args.renderIcon }));
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
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: (0, constants_1.selectControlBlock)(controlMods), role: "group" },
            react_1.default.createElement("button", { ref: ref, role: "combobox", "aria-controls": popupId, className: (0, constants_1.selectControlButtonBlock)(buttonMods, className), "aria-haspopup": "listbox", "aria-expanded": open, "aria-activedescendant": activeIndex === undefined
                    ? undefined
                    : `${selectId}-list-item-${activeIndex}`, name: name, disabled: disabled, onClick: toggleOpen, onKeyDown: onKeyDown, type: "button", "data-qa": qa },
                label && react_1.default.createElement("span", { className: (0, constants_1.selectControlBlock)('label') }, label),
                showPlaceholder && (react_1.default.createElement("span", { className: (0, constants_1.selectControlBlock)('placeholder') }, placeholder)),
                showOptionsText && (react_1.default.createElement("span", { className: (0, constants_1.selectControlBlock)('option-text') }, selectedOptionsContent))),
            renderClearIcon({}),
            react_1.default.createElement(Icon_1.Icon, { className: (0, constants_1.selectControlBlock)('chevron-icon', { disabled }), data: icons_1.ChevronDown, "aria-hidden": "true" })),
        typeof error === 'string' && (react_1.default.createElement("div", { className: (0, constants_1.selectControlBlock)('error') }, error))));
});
exports.SelectControl.displayName = 'SelectControl';
