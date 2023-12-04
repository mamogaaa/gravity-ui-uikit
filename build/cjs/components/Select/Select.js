"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const constants_1 = require("../../constants");
const hooks_1 = require("../../hooks");
const mobile_1 = require("../mobile");
const components_1 = require("./components");
const constants_2 = require("./constants");
const hooks_2 = require("./hooks");
const store_1 = require("./store");
const tech_components_1 = require("./tech-components");
const utils_1 = require("./utils");
exports.Select = react_1.default.forwardRef(function Select(props, ref) {
    const { onUpdate, onOpenChange, onFilterChange, renderControl, renderFilter, renderOption, renderOptionGroup, renderSelectedOption, renderEmptyOptions, getOptionHeight, getOptionGroupHeight, filterOption, name, className, controlClassName, popupClassName, qa, value: propsValue, defaultValue, defaultOpen, open: propsOpen, label, placeholder, filterPlaceholder, width, popupWidth, error, virtualizationThreshold = constants_2.DEFAULT_VIRTUALIZATION_THRESHOLD, view = 'normal', size = 'm', pin = 'round-round', multiple = false, disabled = false, filterable = false, disablePortal, hasClear = false, onClose, id, } = props;
    const [mobile] = (0, mobile_1.useMobile)();
    const [{ filter }, dispatch] = react_1.default.useReducer(store_1.reducer, store_1.initialState);
    // to avoid problem with incorrect popper offset calculation
    // for example: https://github.com/radix-ui/primitives/issues/1567
    const controlWrapRef = react_1.default.useRef(null);
    const controlRef = react_1.default.useRef(null);
    const filterRef = react_1.default.useRef(null);
    const listRef = react_1.default.useRef(null);
    const handleControlRef = (0, hooks_1.useForkRef)(ref, controlRef);
    const { value, open, activeIndex, toggleOpen, handleSelection, handleClearValue, setActiveIndex, } = (0, hooks_1.useSelect)({
        onUpdate,
        value: propsValue,
        defaultValue,
        defaultOpen,
        multiple,
        open: propsOpen,
        onClose,
        onOpenChange,
    });
    const uniqId = (0, hooks_1.useUniqId)();
    const selectId = id !== null && id !== void 0 ? id : uniqId;
    const options = props.options || (0, utils_1.getOptionsFromChildren)(props.children);
    const flattenOptions = (0, utils_1.getFlattenOptions)(options);
    const filteredFlattenOptions = filterable
        ? (0, utils_1.getFilteredFlattenOptions)({
            options: flattenOptions,
            filter,
            filterOption,
        })
        : flattenOptions;
    const selectedOptionsContent = (0, utils_1.getSelectedOptionsContent)(flattenOptions, value, renderSelectedOption);
    const virtualized = filteredFlattenOptions.length >= virtualizationThreshold;
    const handleOptionClick = react_1.default.useCallback((option) => {
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
    const handleControlKeyDown = react_1.default.useCallback((e) => {
        var _a;
        // prevent dialog closing in case of item selection by Enter/Spacebar keydown
        if ([constants_1.KeyCode.ENTER, constants_1.KeyCode.SPACEBAR].includes(e.key) && open) {
            e.preventDefault();
            if (e.key === constants_1.KeyCode.SPACEBAR) {
                handleOptionClick((0, utils_1.getActiveItem)(listRef));
            }
        }
        (_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.onKeyDown(e);
    }, [handleOptionClick, open]);
    const handleFilterKeyDown = react_1.default.useCallback((e) => {
        var _a;
        (_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.onKeyDown(e);
    }, []);
    const handleFilterChange = react_1.default.useCallback((nextFilter) => {
        onFilterChange === null || onFilterChange === void 0 ? void 0 : onFilterChange(nextFilter);
        dispatch({ type: 'SET_FILTER', payload: { filter: nextFilter } });
    }, [onFilterChange]);
    const handleQuickSearchChange = react_1.default.useCallback((search) => {
        var _a;
        if (search) {
            const itemIndex = (0, utils_1.findItemIndexByQuickSearch)(search, (0, utils_1.getListItems)(listRef));
            if (typeof itemIndex === 'number' && itemIndex !== -1) {
                (_a = listRef === null || listRef === void 0 ? void 0 : listRef.current) === null || _a === void 0 ? void 0 : _a.activateItem(itemIndex, true);
            }
        }
    }, []);
    (0, hooks_2.useQuickSearch)({
        onChange: handleQuickSearchChange,
        open,
        disabled: filterable,
    });
    react_1.default.useEffect(() => {
        var _a;
        if (open) {
            (0, utils_1.activateFirstClickableItem)(listRef);
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
    const handleClose = react_1.default.useCallback(() => toggleOpen(false), [toggleOpen]);
    const { onFocus, onBlur } = props;
    const { focusWithinProps } = (0, hooks_1.useFocusWithin)({
        onFocusWithin: onFocus,
        onBlurWithin: react_1.default.useCallback((e) => {
            onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
            handleClose();
        }, [handleClose, onBlur]),
    });
    return (react_1.default.createElement("div", Object.assign({ ref: controlWrapRef, className: (0, constants_2.selectBlock)(mods, className) }, focusWithinProps, { style: inlineStyles }),
        react_1.default.createElement(components_1.SelectControl, { toggleOpen: toggleOpen, hasClear: hasClear, clearValue: handleClearValue, ref: handleControlRef, className: controlClassName, qa: qa, name: name, view: view, size: size, pin: pin, label: label, placeholder: placeholder, selectedOptionsContent: selectedOptionsContent, error: error, open: open, disabled: disabled, onKeyDown: handleControlKeyDown, renderControl: renderControl, value: value, popupId: `select-popup-${selectId}`, selectId: `select-${selectId}`, activeIndex: activeIndex }),
        react_1.default.createElement(components_1.SelectPopup, { ref: controlWrapRef, className: popupClassName, controlRef: controlRef, width: popupWidth, open: open, handleClose: handleClose, disablePortal: disablePortal, virtualized: virtualized, mobile: mobile, id: `select-popup-${selectId}` },
            filterable && (react_1.default.createElement(components_1.SelectFilter, { ref: filterRef, size: size, value: filter, placeholder: filterPlaceholder, onChange: handleFilterChange, onKeyDown: handleFilterKeyDown, renderFilter: renderFilter })),
            filteredFlattenOptions.length || props.loading ? (react_1.default.createElement(components_1.SelectList, { ref: listRef, size: size, value: value, mobile: mobile, flattenOptions: filteredFlattenOptions, multiple: multiple, virtualized: virtualized, onOptionClick: handleOptionClick, renderOption: renderOption, renderOptionGroup: renderOptionGroup, getOptionHeight: getOptionHeight, getOptionGroupHeight: getOptionGroupHeight, loading: props.loading, onLoadMore: props.onLoadMore, selectId: `select-${selectId}`, onChangeActive: setActiveIndex })) : (react_1.default.createElement(components_1.EmptyOptions, { filter: filter, renderEmptyOptions: renderEmptyOptions })))));
});
exports.Select.Option = tech_components_1.Option;
exports.Select.OptionGroup = tech_components_1.OptionGroup;
