"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenuItem = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../Icon");
const Menu_1 = require("../Menu");
const DropdownMenu_classname_1 = require("./DropdownMenu.classname");
const DropdownMenuContext_1 = require("./DropdownMenuContext");
const DropdownMenuPopup_1 = require("./DropdownMenuPopup");
const constants_1 = require("./constants");
const useSubmenu_1 = require("./hooks/useSubmenu");
const DropdownMenuItem = (_a) => {
    var { text, action, items: subMenuItems, popupProps, closeMenu, children, path } = _a, props = tslib_1.__rest(_a, ["text", "action", "items", "popupProps", "closeMenu", "children", "path"]);
    const { toggle, data } = react_1.default.useContext(DropdownMenuContext_1.DropdownMenuContext);
    const menuItemRef = react_1.default.useRef(null);
    const { hasSubmenu, isSubmenuOpen, closeSubmenu, openSubmenu } = (0, useSubmenu_1.useSubmenu)({
        items: subMenuItems,
        path,
    });
    const handleCloseMenu = react_1.default.useCallback(() => {
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
    const handleMenuItemClick = react_1.default.useCallback((event) => {
        if (hasSubmenu) {
            return;
        }
        action === null || action === void 0 ? void 0 : action(event, data);
        handleCloseMenu();
    }, [action, data, handleCloseMenu, hasSubmenu]);
    const extraProps = react_1.default.useMemo(() => {
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
    const iconEnd = hasSubmenu ? (react_1.default.createElement(Icon_1.Icon, { data: icons_1.ChevronRight, size: 10, className: (0, DropdownMenu_classname_1.cnDropdownMenu)('sub-menu-arrow') })) : (props.iconEnd);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Menu_1.Menu.Item, Object.assign({ ref: menuItemRef }, props, { extraProps: extraProps, onClick: handleMenuItemClick, iconEnd: iconEnd }), text || children),
        hasSubmenu && subMenuItems && (react_1.default.createElement(DropdownMenuPopup_1.DropdownMenuPopup, { popupProps: Object.assign(Object.assign({}, popupProps), { className: (0, DropdownMenu_classname_1.cnDropdownMenu)('sub-menu', popupProps === null || popupProps === void 0 ? void 0 : popupProps.className), placement: constants_1.subMenuPlacement }), items: subMenuItems, path: path, open: isSubmenuOpen, anchorRef: menuItemRef, onClose: handleCloseMenu }))));
};
exports.DropdownMenuItem = DropdownMenuItem;
