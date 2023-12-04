import React from 'react';
import { useListNavigation } from '../../hooks';
import { Menu } from '../Menu';
import { Popup } from '../Popup';
import { cnDropdownMenu } from './DropdownMenu.classname';
import { DropdownMenuContext } from './DropdownMenuContext';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuNavigationContext } from './DropdownMenuNavigationContext';
import { isSeparator } from './utils/isSeparator';
import { shouldSkipItemNavigation } from './utils/shouldSkipItemNavigation';
import { stringifyNavigationPath } from './utils/stringifyNavigationPath';
export const DropdownMenuPopup = ({ items, open, anchorRef, onClose, size, menuProps, children, popupProps, path = [], }) => {
    const { toggle, data } = React.useContext(DropdownMenuContext);
    const { activeMenuPath, setActiveMenuPath, anchorRef: navigationAnchorRef, } = React.useContext(DropdownMenuNavigationContext);
    const isSubmenu = path.length > 0;
    const activateParent = React.useCallback(() => {
        setActiveMenuPath(path.slice(0, path.length - 1));
    }, [setActiveMenuPath, path]);
    const handleMouseEnter = React.useCallback((event) => {
        var _a;
        setActiveMenuPath(path);
        (_a = popupProps === null || popupProps === void 0 ? void 0 : popupProps.onMouseEnter) === null || _a === void 0 ? void 0 : _a.call(popupProps, event);
    }, [path, popupProps, setActiveMenuPath]);
    const handleMouseLeave = React.useCallback((event) => {
        var _a;
        activateParent();
        (_a = popupProps === null || popupProps === void 0 ? void 0 : popupProps.onMouseLeave) === null || _a === void 0 ? void 0 : _a.call(popupProps, event);
    }, [activateParent, popupProps]);
    const handleSelect = React.useCallback((activeItem, event) => {
        var _a;
        if (activeItem.items && activeItem.path) {
            setActiveMenuPath(activeItem.path);
        }
        else {
            (_a = activeItem.action) === null || _a === void 0 ? void 0 : _a.call(activeItem, event, data);
            toggle(false);
        }
    }, [data, setActiveMenuPath, toggle]);
    const handleKeydown = React.useCallback((activeItemIndex, event) => {
        switch (event.key) {
            case 'Escape': {
                if (isSubmenu) {
                    event.stopPropagation();
                    activateParent === null || activateParent === void 0 ? void 0 : activateParent();
                }
                return false;
            }
            case 'Enter':
            case ' ': {
                const activeItem = items[activeItemIndex];
                if (activeItem) {
                    event.preventDefault();
                    handleSelect(activeItem, event);
                }
                return false;
            }
        }
        return true;
    }, [activateParent, handleSelect, isSubmenu, items]);
    const isNavigationActive = open && stringifyNavigationPath(path) === stringifyNavigationPath(activeMenuPath);
    const { activeItemIndex, setActiveItemIndex, reset: resetNavigation, } = useListNavigation({
        items,
        skip: shouldSkipItemNavigation,
        anchorRef: navigationAnchorRef,
        onAnchorKeyDown: handleKeydown,
        disabled: !isNavigationActive,
        initialValue: isSubmenu ? 0 : -1,
    });
    React.useEffect(() => {
        if (!open) {
            resetNavigation();
        }
    }, [open, resetNavigation]);
    return (React.createElement(Popup, Object.assign({ open: open, anchorRef: anchorRef, onClose: onClose }, popupProps, { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }), children || (React.createElement(Menu, Object.assign({ className: cnDropdownMenu('menu'), size: size }, menuProps), items.map((item, index) => {
        const isActive = isNavigationActive && activeItemIndex === index;
        const activate = () => setActiveItemIndex(index);
        const extraProps = Object.assign(Object.assign({}, item.extraProps), { onMouseEnter: activate });
        return (React.createElement(DropdownMenuItem, Object.assign({ key: index, className: cnDropdownMenu('menu-item', { separator: isSeparator(item) }, item.className), selected: isActive, popupProps: popupProps, closeMenu: onClose }, item, { extraProps: extraProps })));
    })))));
};
