import React from 'react';
import { KeyCode } from '../../constants';
import { useFocusWithin, useForkRef, useSelect, useUniqId } from '../../hooks';
import { useMobile } from '../mobile';
import { EmptyOptions, SelectControl, SelectFilter, SelectList, SelectPopup } from './components';
import { DEFAULT_VIRTUALIZATION_THRESHOLD, selectBlock } from './constants';
import { useQuickSearch } from './hooks';
import { initialState, reducer } from './store';
import { Option, OptionGroup } from './tech-components';
import { activateFirstClickableItem, findItemIndexByQuickSearch, getActiveItem, getFilteredFlattenOptions, getFlattenOptions, getListItems, getOptionsFromChildren, getSelectedOptionsContent, } from './utils';
import './Select.css';
export const Select = React.forwardRef(function Select(props, ref) {
    const { onUpdate, onOpenChange, onFilterChange, renderControl, renderFilter, renderOption, renderOptionGroup, renderSelectedOption, renderEmptyOptions, getOptionHeight, getOptionGroupHeight, filterOption, name, className, controlClassName, popupClassName, qa, value: propsValue, defaultValue, defaultOpen, open: propsOpen, label, placeholder, filterPlaceholder, width, popupWidth, error, virtualizationThreshold = DEFAULT_VIRTUALIZATION_THRESHOLD, view = 'normal', size = 'm', pin = 'round-round', multiple = false, disabled = false, filterable = false, disablePortal, hasClear = false, onClose, id, } = props;
    const [mobile] = useMobile();
    const [{ filter }, dispatch] = React.useReducer(reducer, initialState);
    // to avoid problem with incorrect popper offset calculation
    // for example: https://github.com/radix-ui/primitives/issues/1567
    const controlWrapRef = React.useRef(null);
    const controlRef = React.useRef(null);
    const filterRef = React.useRef(null);
    const listRef = React.useRef(null);
    const handleControlRef = useForkRef(ref, controlRef);
    const { value, open, activeIndex, toggleOpen, handleSelection, handleClearValue, setActiveIndex, } = useSelect({
        onUpdate,
        value: propsValue,
        defaultValue,
        defaultOpen,
        multiple,
        open: propsOpen,
        onClose,
        onOpenChange,
    });
    const uniqId = useUniqId();
    const selectId = id !== null && id !== void 0 ? id : uniqId;
    const options = props.options || getOptionsFromChildren(props.children);
    const flattenOptions = getFlattenOptions(options);
    const filteredFlattenOptions = filterable
        ? getFilteredFlattenOptions({
            options: flattenOptions,
            filter,
            filterOption,
        })
        : flattenOptions;
    const selectedOptionsContent = getSelectedOptionsContent(flattenOptions, value, renderSelectedOption);
    const virtualized = filteredFlattenOptions.length >= virtualizationThreshold;
    const handleOptionClick = React.useCallback((option) => {
        var _a, _b;
        if (!option || (option === null || option === void 0 ? void 0 : option.disabled) || 'label' in option) {
            return;
        }
        if (multiple) {
            const activeItemIndex = (_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.getActiveItem();
            (_b = filterRef.current) === null || _b === void 0 ? void 0 : _b.focus();
            if (typeof activeItemIndex === 'number') {
                // prevent item deactivation in case of multiple selection
                // https://github.com/gravity-ui/uikit/blob/main/src/components/List/List.tsx#L369
                // Will fixed after https://github.com/gravity-ui/uikit/issues/385
                setTimeout(() => {
                    var _a;
                    (_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.activateItem(activeItemIndex, true);
                }, 50);
            }
        }
        handleSelection(option);
    }, [handleSelection, multiple]);
    const handleControlKeyDown = React.useCallback((e) => {
        var _a;
        // prevent dialog closing in case of item selection by Enter/Spacebar keydown
        if ([KeyCode.ENTER, KeyCode.SPACEBAR].includes(e.key) && open) {
            e.preventDefault();
            if (e.key === KeyCode.SPACEBAR) {
                handleOptionClick(getActiveItem(listRef));
            }
        }
        (_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.onKeyDown(e);
    }, [handleOptionClick, open]);
    const handleFilterKeyDown = React.useCallback((e) => {
        var _a;
        (_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.onKeyDown(e);
    }, []);
    const handleFilterChange = React.useCallback((nextFilter) => {
        onFilterChange === null || onFilterChange === void 0 ? void 0 : onFilterChange(nextFilter);
        dispatch({ type: 'SET_FILTER', payload: { filter: nextFilter } });
    }, [onFilterChange]);
    const handleQuickSearchChange = React.useCallback((search) => {
        var _a;
        if (search) {
            const itemIndex = findItemIndexByQuickSearch(search, getListItems(listRef));
            if (typeof itemIndex === 'number' && itemIndex !== -1) {
                (_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.activateItem(itemIndex, true);
            }
        }
    }, []);
    useQuickSearch({
        onChange: handleQuickSearchChange,
        open,
        disabled: filterable,
    });
    React.useEffect(() => {
        var _a;
        if (open) {
            activateFirstClickableItem(listRef);
            if (filterable) {
                (_a = filterRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }
        else {
            dispatch({ type: 'SET_FILTER', payload: { filter: '' } });
        }
    }, [open, filterable]);
    const mods = Object.assign({}, (width === 'max' && { width }));
    const inlineStyles = {};
    if (typeof width === 'number') {
        inlineStyles.width = width;
    }
    const handleClose = React.useCallback(() => toggleOpen(false), [toggleOpen]);
    const { onFocus, onBlur } = props;
    const { focusWithinProps } = useFocusWithin({
        onFocusWithin: onFocus,
        onBlurWithin: React.useCallback((e) => {
            onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
            handleClose();
        }, [handleClose, onBlur]),
    });
    return (React.createElement("div", Object.assign({ ref: controlWrapRef, className: selectBlock(mods, className) }, focusWithinProps, { style: inlineStyles }),
        React.createElement(SelectControl, { toggleOpen: toggleOpen, hasClear: hasClear, clearValue: handleClearValue, ref: handleControlRef, className: controlClassName, qa: qa, name: name, view: view, size: size, pin: pin, label: label, placeholder: placeholder, selectedOptionsContent: selectedOptionsContent, error: error, open: open, disabled: disabled, onKeyDown: handleControlKeyDown, renderControl: renderControl, value: value, popupId: `select-popup-${selectId}`, selectId: `select-${selectId}`, activeIndex: activeIndex }),
        React.createElement(SelectPopup, { ref: controlWrapRef, className: popupClassName, controlRef: controlRef, width: popupWidth, open: open, handleClose: handleClose, disablePortal: disablePortal, virtualized: virtualized, mobile: mobile, id: `select-popup-${selectId}` },
            filterable && (React.createElement(SelectFilter, { ref: filterRef, size: size, value: filter, placeholder: filterPlaceholder, onChange: handleFilterChange, onKeyDown: handleFilterKeyDown, renderFilter: renderFilter })),
            filteredFlattenOptions.length || props.loading ? (React.createElement(SelectList, { ref: listRef, size: size, value: value, mobile: mobile, flattenOptions: filteredFlattenOptions, multiple: multiple, virtualized: virtualized, onOptionClick: handleOptionClick, renderOption: renderOption, renderOptionGroup: renderOptionGroup, getOptionHeight: getOptionHeight, getOptionGroupHeight: getOptionGroupHeight, loading: props.loading, onLoadMore: props.onLoadMore, selectId: `select-${selectId}`, onChangeActive: setActiveIndex })) : (React.createElement(EmptyOptions, { filter: filter, renderEmptyOptions: renderEmptyOptions })))));
});
Select.Option = Option;
Select.OptionGroup = OptionGroup;
