import { __rest } from "tslib";
import React from 'react';
import { ChevronRight } from '@gravity-ui/icons';
import { Icon } from '../Icon';
import { Menu } from '../Menu';
import { cnDropdownMenu } from './DropdownMenu.classname';
import { DropdownMenuContext } from './DropdownMenuContext';
import { DropdownMenuPopup } from './DropdownMenuPopup';
import { subMenuPlacement } from './constants';
import { useSubmenu } from './hooks/useSubmenu';
export const DropdownMenuItem = (_a) => {
    var { text, action, items: subMenuItems, popupProps, closeMenu, children, path } = _a, props = __rest(_a, ["text", "action", "items", "popupProps", "closeMenu", "children", "path"]);
    const { toggle, data } = React.useContext(DropdownMenuContext);
    const menuItemRef = React.useRef(null);
    const { hasSubmenu, isSubmenuOpen, closeSubmenu, openSubmenu } = useSubmenu({
        items: subMenuItems,
        path,
    });
    const handleCloseMenu = React.useCallback(() => {
        const close = () => {
            if (closeMenu) {
                closeMenu();
            }
            else {
                toggle(false);
            }
        };
        if (hasSubmenu) {
            closeSubmenu();
            // Wait for submenu to close
            requestAnimationFrame(close);
        }
        else {
            close();
        }
    }, [closeMenu, closeSubmenu, hasSubmenu, toggle]);
    const handleMenuItemClick = React.useCallback((event) => {
        if (hasSubmenu) {
            return;
        }
        action === null || action === void 0 ? void 0 : action(event, data);
        handleCloseMenu();
    }, [action, data, handleCloseMenu, hasSubmenu]);
    const extraProps = React.useMemo(() => {
        return Object.assign(Object.assign({}, props.extraProps), { onMouseEnter: (event) => {
                var _a, _b;
                (_b = (_a = props.extraProps) === null || _a === void 0 ? void 0 : _a.onMouseEnter) === null || _b === void 0 ? void 0 : _b.call(_a, event);
                if (hasSubmenu) {
                    openSubmenu();
                }
            }, onMouseLeave: (event) => {
                var _a, _b;
                (_b = (_a = props.extraProps) === null || _a === void 0 ? void 0 : _a.onMouseLeave) === null || _b === void 0 ? void 0 : _b.call(_a, event);
                if (hasSubmenu) {
                    closeSubmenu();
                }
            } });
    }, [props.extraProps, closeSubmenu, hasSubmenu, openSubmenu]);
    const iconEnd = hasSubmenu ? (React.createElement(Icon, { data: ChevronRight, size: 10, className: cnDropdownMenu('sub-menu-arrow') })) : (props.iconEnd);
    return (React.createElement(React.Fragment, null,
        React.createElement(Menu.Item, Object.assign({ ref: menuItemRef }, props, { extraProps: extraProps, onClick: handleMenuItemClick, iconEnd: iconEnd }), text || children),
        hasSubmenu && subMenuItems && (React.createElement(DropdownMenuPopup, { popupProps: Object.assign(Object.assign({}, popupProps), { className: cnDropdownMenu('sub-menu', popupProps === null || popupProps === void 0 ? void 0 : popupProps.className), placement: subMenuPlacement }), items: subMenuItems, path: path, open: isSubmenuOpen, anchorRef: menuItemRef, onClose: handleCloseMenu }))));
};
