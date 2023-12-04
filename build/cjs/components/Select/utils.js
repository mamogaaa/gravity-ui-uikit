"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredFlattenOptions = exports.activateFirstClickableItem = exports.getActiveItem = exports.getListItems = exports.findItemIndexByQuickSearch = exports.getNextQuickSearch = exports.getOptionsFromChildren = exports.getSelectedOptionsContent = exports.getOptionsHeight = exports.getPopupItemHeight = exports.getFlattenOptions = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const constants_1 = require("../../constants");
const constants_2 = require("./constants");
const getFlattenOptions = (options) => {
    return options.reduce((acc, option) => {
        if ('label' in option) {
            acc.push({ label: option.label, disabled: true });
            acc.push(...(option.options || []));
        }
        else {
            acc.push(option);
        }
        return acc;
    }, []);
};
exports.getFlattenOptions = getFlattenOptions;
const getPopupItemHeight = (args) => {
    const { getOptionHeight, getOptionGroupHeight, size, option, index, mobile } = args;
    let itemHeight = mobile ? constants_2.MOBILE_ITEM_HEIGHT : constants_2.SIZE_TO_ITEM_HEIGHT[size];
    if ('label' in option) {
        const marginTop = index === 0 ? 0 : constants_2.GROUP_ITEM_MARGIN_TOP;
        itemHeight = option.label === '' ? 0 : itemHeight;
        return getOptionGroupHeight ? getOptionGroupHeight(option, index) : itemHeight + marginTop;
    }
    return getOptionHeight ? getOptionHeight(option, index) : itemHeight;
};
exports.getPopupItemHeight = getPopupItemHeight;
const getOptionsHeight = (args) => {
    const { getOptionHeight, getOptionGroupHeight, size, options, mobile } = args;
    return options.reduce((height, option, index) => {
        return (height +
            (0, exports.getPopupItemHeight)({ getOptionHeight, getOptionGroupHeight, size, option, index, mobile }));
    }, 0);
};
exports.getOptionsHeight = getOptionsHeight;
const getOptionText = (option) => {
    if (typeof option.content === 'string') {
        return option.content;
    }
    if (typeof option.children === 'string') {
        return option.children;
    }
    if (option.text) {
        return option.text;
    }
    return option.value;
};
const getSelectedOptionsContent = (flattenOptions, value, renderSelectedOption) => {
    if (value.length === 0) {
        return null;
    }
    const flattenSimpleOptions = flattenOptions.filter((opt) => !('label' in opt));
    const selectedOptions = value.reduce((acc, val) => {
        const selectedOption = flattenSimpleOptions.find((opt) => opt.value === val);
        acc.push(selectedOption || { value: val });
        return acc;
    }, []);
    if (renderSelectedOption) {
        return selectedOptions.map((option, index) => {
            return (react_1.default.createElement(react_1.default.Fragment, { key: option.value }, renderSelectedOption(option, index)));
        });
    }
    else {
        return selectedOptions
            .map((option) => {
            return getOptionText(option);
        })
            .join(', ');
    }
};
exports.getSelectedOptionsContent = getSelectedOptionsContent;
const getTypedChildrenArray = (children) => {
    return react_1.default.Children.toArray(children);
};
const getOptionsFromOptgroupChildren = (children) => {
    return react_1.default.Children.toArray(children).reduce((acc, { props }) => {
        if ('value' in props) {
            acc.push(props);
        }
        return acc;
    }, []);
};
const getOptionsFromChildren = (children) => {
    return getTypedChildrenArray(children).reduce((acc, { props }) => {
        if ('label' in props) {
            const options = props.options || getOptionsFromOptgroupChildren(props.children);
            acc.push({
                options,
                label: props.label,
            });
        }
        if ('value' in props) {
            acc.push(Object.assign({}, props));
        }
        return acc;
    }, []);
};
exports.getOptionsFromChildren = getOptionsFromChildren;
const getNextQuickSearch = (keyCode, quickSearch) => {
    // https://www.w3.org/TR/uievents-code/#key-alphanumeric-writing-system
    const writingSystemKeyPressed = keyCode.length === 1;
    const backspacePressed = keyCode === constants_1.KeyCode.BACKSPACE;
    let nextQuickSearch = '';
    if (backspacePressed && quickSearch.length) {
        nextQuickSearch = quickSearch.slice(0, quickSearch.length - 1);
    }
    else if (writingSystemKeyPressed) {
        nextQuickSearch = (quickSearch + keyCode).trim();
    }
    return nextQuickSearch;
};
exports.getNextQuickSearch = getNextQuickSearch;
const getEscapedRegExp = (string) => {
    return new RegExp(string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
};
const findItemIndexByQuickSearch = (quickSearch, items) => {
    if (!items) {
        return -1;
    }
    return items.findIndex((item) => {
        if ('label' in item) {
            return false;
        }
        if (item.disabled) {
            return false;
        }
        const optionText = getOptionText(item);
        return getEscapedRegExp(quickSearch).test(optionText);
    });
};
exports.findItemIndexByQuickSearch = findItemIndexByQuickSearch;
const getListItems = (listRef) => {
    var _a;
    return ((_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.getItems()) || [];
};
exports.getListItems = getListItems;
const getActiveItem = (listRef) => {
    var _a;
    const items = (0, exports.getListItems)(listRef);
    const activeItemIndex = (_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.getActiveItem();
    return typeof activeItemIndex === 'number' ? items[activeItemIndex] : undefined;
};
exports.getActiveItem = getActiveItem;
const activateFirstClickableItem = (listRef) => {
    var _a;
    const items = (0, exports.getListItems)(listRef);
    const isGroupTitleFirstItem = items[0] && 'label' in items[0];
    (_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.activateItem(isGroupTitleFirstItem ? 1 : 0, false);
};
exports.activateFirstClickableItem = activateFirstClickableItem;
const isOptionMatchedByFilter = (option, filter) => {
    const lowerOptionText = getOptionText(option).toLocaleLowerCase();
    const lowerFilter = filter.toLocaleLowerCase();
    return lowerOptionText.indexOf(lowerFilter) !== -1;
};
const isGroupTitle = (option) => {
    return Boolean(option && 'label' in option);
};
const getFilteredFlattenOptions = (args) => {
    const { options, filter, filterOption } = args;
    const filteredOptions = options.filter((option) => {
        if (isGroupTitle(option)) {
            return true;
        }
        return filterOption
            ? filterOption(option, filter)
            : isOptionMatchedByFilter(option, filter);
    });
    return filteredOptions.reduce((acc, option, index) => {
        const groupTitle = isGroupTitle(option);
        const previousGroupTitle = isGroupTitle(acc[acc.length - 1]);
        const isLastOption = index === filteredOptions.length - 1;
        if (groupTitle && previousGroupTitle) {
            acc.pop();
        }
        if (!groupTitle || (groupTitle && !isLastOption)) {
            acc.push(option);
        }
        return acc;
    }, []);
};
exports.getFilteredFlattenOptions = getFilteredFlattenOptions;
