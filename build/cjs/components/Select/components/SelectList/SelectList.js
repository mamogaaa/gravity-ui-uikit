"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectList = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const List_1 = require("../../../List");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
const GroupLabel_1 = require("./GroupLabel");
const OptionWrap_1 = require("./OptionWrap");
const SelectLoadingIndicator_1 = require("./SelectLoadingIndicator");
const loadingOption = { value: '__SELECT_LIST_ITEM_LOADING__', disabled: true };
exports.SelectList = react_1.default.forwardRef((props, ref) => {
    const { onOptionClick, renderOption, renderOptionGroup, getOptionHeight, getOptionGroupHeight, size, flattenOptions, value, multiple, virtualized, mobile, loading, onLoadMore, selectId, onChangeActive, } = props;
    const items = react_1.default.useMemo(() => (loading ? [...flattenOptions, loadingOption] : flattenOptions), [flattenOptions, loading]);
    const selectedIndexes = react_1.default.useMemo(() => flattenOptions.reduce((acc, option, index) => {
        if ('value' in option && value.includes(option.value)) {
            acc.push(index);
        }
        return acc;
    }, []), [flattenOptions, value]);
    const optionsHeight = (0, utils_1.getOptionsHeight)({
        options: items,
        getOptionHeight,
        getOptionGroupHeight,
        size,
        mobile,
    });
    const getItemHeight = react_1.default.useCallback((option, index) => {
        return (0, utils_1.getPopupItemHeight)({
            getOptionHeight,
            getOptionGroupHeight,
            size,
            option,
            index,
            mobile,
        });
    }, [getOptionHeight, getOptionGroupHeight, mobile, size]);
    const renderItem = react_1.default.useCallback((option, _isItemActive, itemIndex) => {
        if ('label' in option) {
            const wrappedRenderOptionGroup = renderOptionGroup
                ? (optionLocal) => {
                    return renderOptionGroup(optionLocal, {
                        itemHeight: getItemHeight(optionLocal, itemIndex),
                    });
                }
                : undefined;
            return react_1.default.createElement(GroupLabel_1.GroupLabel, { option: option, renderOptionGroup: wrappedRenderOptionGroup });
        }
        if (option.value === loadingOption.value) {
            return (react_1.default.createElement(SelectLoadingIndicator_1.SelectLoadingIndicator, { onIntersect: itemIndex === 0 ? undefined : onLoadMore }));
        }
        const wrappedRenderOption = renderOption
            ? (optionLocal) => {
                return renderOption(optionLocal, {
                    itemHeight: getItemHeight(optionLocal, itemIndex),
                });
            }
            : undefined;
        return (react_1.default.createElement(OptionWrap_1.OptionWrap, { option: option, value: value, multiple: multiple, renderOption: wrappedRenderOption }));
    }, [renderOption, renderOptionGroup, value, multiple, getItemHeight]);
    return (react_1.default.createElement(List_1.List, { ref: ref, className: (0, constants_1.selectListBlock)({ size, virtualized, mobile }), qa: constants_1.SelectQa.LIST, itemClassName: (0, constants_1.selectListBlock)('item'), itemHeight: getItemHeight, itemsHeight: virtualized ? optionsHeight : undefined, items: items, filterable: false, virtualized: virtualized, renderItem: renderItem, onItemClick: onOptionClick, selectedItemIndex: selectedIndexes, id: `${selectId}-list`, role: "listbox", onChangeActive: onChangeActive }));
});
exports.SelectList.displayName = 'SelectList';
