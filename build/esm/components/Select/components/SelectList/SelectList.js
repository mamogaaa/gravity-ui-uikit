import React from 'react';
import { List } from '../../../List';
import { SelectQa, selectListBlock } from '../../constants';
import { getOptionsHeight, getPopupItemHeight } from '../../utils';
import { GroupLabel } from './GroupLabel';
import { OptionWrap } from './OptionWrap';
import { SelectLoadingIndicator } from './SelectLoadingIndicator';
import './SelectList.css';
const loadingOption = { value: '__SELECT_LIST_ITEM_LOADING__', disabled: true };
export const SelectList = React.forwardRef((props, ref) => {
    const { onOptionClick, renderOption, renderOptionGroup, getOptionHeight, getOptionGroupHeight, size, flattenOptions, value, multiple, virtualized, mobile, loading, onLoadMore, selectId, onChangeActive, } = props;
    const items = React.useMemo(() => (loading ? [...flattenOptions, loadingOption] : flattenOptions), [flattenOptions, loading]);
    const selectedIndexes = React.useMemo(() => flattenOptions.reduce((acc, option, index) => {
        if ('value' in option && value.includes(option.value)) {
            acc.push(index);
        }
        return acc;
    }, []), [flattenOptions, value]);
    const optionsHeight = getOptionsHeight({
        options: items,
        getOptionHeight,
        getOptionGroupHeight,
        size,
        mobile,
    });
    const getItemHeight = React.useCallback((option, index) => {
        return getPopupItemHeight({
            getOptionHeight,
            getOptionGroupHeight,
            size,
            option,
            index,
            mobile,
        });
    }, [getOptionHeight, getOptionGroupHeight, mobile, size]);
    const renderItem = React.useCallback((option, _isItemActive, itemIndex) => {
        if ('label' in option) {
            const wrappedRenderOptionGroup = renderOptionGroup
                ? (optionLocal) => {
                    return renderOptionGroup(optionLocal, {
                        itemHeight: getItemHeight(optionLocal, itemIndex),
                    });
                }
                : undefined;
            return React.createElement(GroupLabel, { option: option, renderOptionGroup: wrappedRenderOptionGroup });
        }
        if (option.value === loadingOption.value) {
            return (React.createElement(SelectLoadingIndicator, { onIntersect: itemIndex === 0 ? undefined : onLoadMore }));
        }
        const wrappedRenderOption = renderOption
            ? (optionLocal) => {
                return renderOption(optionLocal, {
                    itemHeight: getItemHeight(optionLocal, itemIndex),
                });
            }
            : undefined;
        return (React.createElement(OptionWrap, { option: option, value: value, multiple: multiple, renderOption: wrappedRenderOption }));
    }, [renderOption, renderOptionGroup, value, multiple, getItemHeight]);
    return (React.createElement(List, { ref: ref, className: selectListBlock({ size, virtualized, mobile }), qa: SelectQa.LIST, itemClassName: selectListBlock('item'), itemHeight: getItemHeight, itemsHeight: virtualized ? optionsHeight : undefined, items: items, filterable: false, virtualized: virtualized, renderItem: renderItem, onItemClick: onOptionClick, selectedItemIndex: selectedIndexes, id: `${selectId}-list`, role: "listbox", onChangeActive: onChangeActive }));
});
SelectList.displayName = 'SelectList';
