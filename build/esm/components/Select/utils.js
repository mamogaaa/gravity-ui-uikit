import React from 'react';
import { KeyCode } from '../../constants';
import { GROUP_ITEM_MARGIN_TOP, MOBILE_ITEM_HEIGHT, SIZE_TO_ITEM_HEIGHT } from './constants';
export const getFlattenOptions = (options) => {
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
export const getPopupItemHeight = (args) => {
    const { getOptionHeight, getOptionGroupHeight, size, option, index, mobile } = args;
    let itemHeight = mobile ? MOBILE_ITEM_HEIGHT : SIZE_TO_ITEM_HEIGHT[size];
    if ('label' in option) {
        const marginTop = index === 0 ? 0 : GROUP_ITEM_MARGIN_TOP;
        itemHeight = option.label === '' ? 0 : itemHeight;
        return getOptionGroupHeight ? getOptionGroupHeight(option, index) : itemHeight + marginTop;
    }
    return getOptionHeight ? getOptionHeight(option, index) : itemHeight;
};
export const getOptionsHeight = (args) => {
    const { getOptionHeight, getOptionGroupHeight, size, options, mobile } = args;
    return options.reduce((height, option, index) => {
        return (height +
            getPopupItemHeight({ getOptionHeight, getOptionGroupHeight, size, option, index, mobile }));
    }, 0);
};
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
export const getSelectedOptionsContent = (flattenOptions, value, renderSelectedOption) => {
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
            return (React.createElement(React.Fragment, { key: option.value }, renderSelectedOption(option, index)));
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
const getTypedChildrenArray = (children) => {
    return React.Children.toArray(children);
};
const getOptionsFromOptgroupChildren = (children) => {
    return React.Children.toArray(children).reduce((acc, { props }) => {
        if ('value' in props) {
            acc.push(props);
        }
        return acc;
    }, []);
};
export const getOptionsFromChildren = (children) => {
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
export const getNextQuickSearch = (keyCode, quickSearch) => {
    // https://www.w3.org/TR/uievents-code/#key-alphanumeric-writing-system
    const writingSystemKeyPressed = keyCode.length === 1;
    const backspacePressed = keyCode === KeyCode.BACKSPACE;
    let nextQuickSearch = '';
    if (backspacePressed && quickSearch.length) {
        nextQuickSearch = quickSearch.slice(0, quickSearch.length - 1);
    }
    else if (writingSystemKeyPressed) {
        nextQuickSearch = (quickSearch + keyCode).trim();
    }
    return nextQuickSearch;
};
const getEscapedRegExp = (string) => {
    return new RegExp(string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
};
export const findItemIndexByQuickSearch = (quickSearch, items) => {
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
export const getListItems = (listRef) => {
    var _a;
    return ((_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.getItems()) || [];
};
export const getActiveItem = (listRef) => {
    var _a;
    const items = getListItems(listRef);
    const activeItemIndex = (_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.getActiveItem();
    return typeof activeItemIndex === 'number' ? items[activeItemIndex] : undefined;
};
export const activateFirstClickableItem = (listRef) => {
    var _a;
    const items = getListItems(listRef);
    const isGroupTitleFirstItem = items[0] && 'label' in items[0];
    (_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.activateItem(isGroupTitleFirstItem ? 1 : 0, false);
};
const isOptionMatchedByFilter = (option, filter) => {
    const lowerOptionText = getOptionText(option).toLocaleLowerCase();
    const lowerFilter = filter.toLocaleLowerCase();
    return lowerOptionText.indexOf(lowerFilter) !== -1;
};
const isGroupTitle = (option) => {
    return Boolean(option && 'label' in option);
};
export const getFilteredFlattenOptions = (args) => {
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