import React from 'react';
import { Gear } from '@gravity-ui/icons';
import { useActionHandlers } from '../../../../../hooks/useActionHandlers';
import { Button } from '../../../../Button';
import { Icon } from '../../../../Icon';
import { List } from '../../../../List';
import { Popup } from '../../../../Popup';
import { block } from '../../../../utils/cn';
import { LockIcon } from './LockIcon';
import { TickIcon } from './TickIcon';
import i18n from './i18n';
import './TableColumnSetup.css';
const b = block('table-column-setup');
export const TableColumnSetup = (props) => {
    const { switcher, renderSwitcher, disabled, popupWidth, popupPlacement, className, items: propsItems, getItemTitle = (item) => item.title, sortable = true, filterable = false, showStatus, } = props;
    const [focused, setFocused] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [currentItems, setCurrentItems] = React.useState([]);
    const [requiredItems, setRequiredItems] = React.useState([]);
    const refControl = React.useRef(null);
    const LIST_ITEM_HEIGHT = 36;
    const getRequiredItems = (list) => list
        .filter(({ required }) => required)
        .map((column) => (Object.assign(Object.assign({}, column), { disabled: true })));
    const getConfigurableItems = (list) => list.filter(({ required }) => !required);
    React.useEffect(() => {
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
        setCurrentItems(List.moveListElement(list.slice(), oldIndex, newIndex));
    };
    const handleUpdate = (value) => setCurrentItems(value);
    const handleClosePopup = () => setInitialState();
    const handleControlClick = React.useCallback(() => {
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
        return (React.createElement("div", { className: b('item-content') },
            item.required ? (React.createElement("div", { className: b('lock-wrap', { visible: item.selected }) },
                React.createElement(Icon, { data: LockIcon }))) : (React.createElement("div", { className: b('tick-wrap', { visible: item.selected }) },
                React.createElement(Icon, { data: TickIcon, className: b('tick'), width: 10, height: 10 }))),
            React.createElement("div", { className: b('title') }, getItemTitle(item))));
    };
    const renderStatus = () => {
        if (!showStatus) {
            return null;
        }
        const selected = getCountSelected();
        const all = propsItems.length;
        const status = `${selected}/${all}`;
        return React.createElement("span", { className: b('status') }, status);
    };
    const renderRequiredColumns = () => {
        const hasRequiredColumns = requiredItems.length;
        if (!hasRequiredColumns) {
            return null;
        }
        return (React.createElement(List, { items: requiredItems, itemHeight: LIST_ITEM_HEIGHT, itemsHeight: getRequiredListHeight, filterable: filterable, renderItem: renderItem, itemsClassName: b('items'), itemClassName: b('item'), virtualized: false }));
    };
    const renderConfigurableColumns = () => {
        return (React.createElement(List, { items: currentItems, itemHeight: LIST_ITEM_HEIGHT, itemsHeight: getListHeight, sortable: sortable, filterable: filterable, sortHandleAlign: 'right', onSortEnd: makeOnSortEnd(currentItems), onItemClick: handleItemClick, renderItem: renderItem, itemsClassName: b('items'), itemClassName: b('item'), virtualized: false }));
    };
    const { onKeyDown: handleControlKeyDown } = useActionHandlers(handleControlClick);
    const switcherProps = React.useMemo(() => ({
        onClick: handleControlClick,
        onKeyDown: handleControlKeyDown,
    }), [handleControlClick, handleControlKeyDown]);
    return (React.createElement("div", { className: b(null, className) },
        React.createElement("div", Object.assign({ className: b('control'), ref: refControl }, (renderSwitcher ? {} : switcherProps)), (renderSwitcher === null || renderSwitcher === void 0 ? void 0 : renderSwitcher(switcherProps)) || switcher || (React.createElement(Button, { disabled: disabled },
            React.createElement(Icon, { data: Gear }),
            i18n('button_switcher'),
            renderStatus()))),
        React.createElement(Popup, { anchorRef: refControl, placement: popupPlacement || ['bottom-start', 'bottom-end', 'top-start', 'top-end'], open: focused, onClose: handleClosePopup, className: b('popup'), style: { width: popupWidth } },
            renderRequiredColumns(),
            renderConfigurableColumns(),
            React.createElement("div", { className: b('controls') },
                React.createElement(Button, { view: "action", width: "max", onClick: handleApplyClick }, i18n('button_apply'))))));
};
