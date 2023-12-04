"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableColumnSetup = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const useActionHandlers_1 = require("../../../../../hooks/useActionHandlers");
const Button_1 = require("../../../../Button");
const Icon_1 = require("../../../../Icon");
const List_1 = require("../../../../List");
const Popup_1 = require("../../../../Popup");
const cn_1 = require("../../../../utils/cn");
const LockIcon_1 = require("./LockIcon");
const TickIcon_1 = require("./TickIcon");
const i18n_1 = tslib_1.__importDefault(require("./i18n"));
const b = (0, cn_1.block)('table-column-setup');
const TableColumnSetup = (props) => {
    const { switcher, renderSwitcher, disabled, popupWidth, popupPlacement, className, items: propsItems, getItemTitle = (item) => item.title, sortable = true, filterable = false, showStatus, } = props;
    const [focused, setFocused] = react_1.default.useState(false);
    const [items, setItems] = react_1.default.useState([]);
    const [currentItems, setCurrentItems] = react_1.default.useState([]);
    const [requiredItems, setRequiredItems] = react_1.default.useState([]);
    const refControl = react_1.default.useRef(null);
    const LIST_ITEM_HEIGHT = 36;
    const getRequiredItems = (list) => list
        .filter(({ required }) => required)
        .map((column) => (Object.assign(Object.assign({}, column), { disabled: true })));
    const getConfigurableItems = (list) => list.filter(({ required }) => !required);
    react_1.default.useEffect(() => {
        if (propsItems !== items) {
            setItems(propsItems);
            setRequiredItems(getRequiredItems(propsItems));
            setCurrentItems(getConfigurableItems(propsItems));
        }
    }, [items, propsItems]);
    const setInitialState = () => {
        setFocused(false);
        setRequiredItems(getRequiredItems(items));
        setCurrentItems(getConfigurableItems(items));
    };
    const getListHeight = (list) => {
        const itemHeight = LIST_ITEM_HEIGHT;
        return Math.min(5, list.length) * itemHeight + itemHeight / 2;
    };
    const getRequiredListHeight = (list) => list.length * LIST_ITEM_HEIGHT;
    const getCountSelected = () => items.reduce((acc, cur) => (cur.selected ? acc + 1 : acc), 0);
    const makeOnSortEnd = (list) => ({ oldIndex, newIndex }) => {
        setCurrentItems(List_1.List.moveListElement(list.slice(), oldIndex, newIndex));
    };
    const handleUpdate = (value) => setCurrentItems(value);
    const handleClosePopup = () => setInitialState();
    const handleControlClick = react_1.default.useCallback(() => {
        if (!disabled) {
            setFocused(!focused);
            setRequiredItems(getRequiredItems(items));
            setCurrentItems(getConfigurableItems(items));
        }
    }, [disabled, focused, items]);
    const handleApplyClick = () => {
        setInitialState();
        const newItems = requiredItems.concat(currentItems);
        if (items !== newItems) {
            props.onUpdate(newItems);
        }
    };
    const handleItemClick = (value) => {
        const newItems = currentItems.map((item) => item === value ? Object.assign(Object.assign({}, item), { selected: !item.selected }) : item);
        handleUpdate(newItems);
    };
    const renderItem = (item) => {
        return (react_1.default.createElement("div", { className: b('item-content') },
            item.required ? (react_1.default.createElement("div", { className: b('lock-wrap', { visible: item.selected }) },
                react_1.default.createElement(Icon_1.Icon, { data: LockIcon_1.LockIcon }))) : (react_1.default.createElement("div", { className: b('tick-wrap', { visible: item.selected }) },
                react_1.default.createElement(Icon_1.Icon, { data: TickIcon_1.TickIcon, className: b('tick'), width: 10, height: 10 }))),
            react_1.default.createElement("div", { className: b('title') }, getItemTitle(item))));
    };
    const renderStatus = () => {
        if (!showStatus) {
            return null;
        }
        const selected = getCountSelected();
        const all = propsItems.length;
        const status = `${selected}/${all}`;
        return react_1.default.createElement("span", { className: b('status') }, status);
    };
    const renderRequiredColumns = () => {
        const hasRequiredColumns = requiredItems.length;
        if (!hasRequiredColumns) {
            return null;
        }
        return (react_1.default.createElement(List_1.List, { items: requiredItems, itemHeight: LIST_ITEM_HEIGHT, itemsHeight: getRequiredListHeight, filterable: filterable, renderItem: renderItem, itemsClassName: b('items'), itemClassName: b('item'), virtualized: false }));
    };
    const renderConfigurableColumns = () => {
        return (react_1.default.createElement(List_1.List, { items: currentItems, itemHeight: LIST_ITEM_HEIGHT, itemsHeight: getListHeight, sortable: sortable, filterable: filterable, sortHandleAlign: 'right', onSortEnd: makeOnSortEnd(currentItems), onItemClick: handleItemClick, renderItem: renderItem, itemsClassName: b('items'), itemClassName: b('item'), virtualized: false }));
    };
    const { onKeyDown: handleControlKeyDown } = (0, useActionHandlers_1.useActionHandlers)(handleControlClick);
    const switcherProps = react_1.default.useMemo(() => ({
        onClick: handleControlClick,
        onKeyDown: handleControlKeyDown,
    }), [handleControlClick, handleControlKeyDown]);
    return (react_1.default.createElement("div", { className: b(null, className) },
        react_1.default.createElement("div", Object.assign({ className: b('control'), ref: refControl }, (renderSwitcher ? {} : switcherProps)), (renderSwitcher === null || renderSwitcher === void 0 ? void 0 : renderSwitcher(switcherProps)) || switcher || (react_1.default.createElement(Button_1.Button, { disabled: disabled },
            react_1.default.createElement(Icon_1.Icon, { data: icons_1.Gear }),
            (0, i18n_1.default)('button_switcher'),
            renderStatus()))),
        react_1.default.createElement(Popup_1.Popup, { anchorRef: refControl, placement: popupPlacement || ['bottom-start', 'bottom-end', 'top-start', 'top-end'], open: focused, onClose: handleClosePopup, className: b('popup'), style: { width: popupWidth } },
            renderRequiredColumns(),
            renderConfigurableColumns(),
            react_1.default.createElement("div", { className: b('controls') },
                react_1.default.createElement(Button_1.Button, { view: "action", width: "max", onClick: handleApplyClick }, (0, i18n_1.default)('button_apply'))))));
};
exports.TableColumnSetup = TableColumnSetup;
