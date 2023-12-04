"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenuPopup = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const hooks_1 = require("../../hooks");
const Menu_1 = require("../Menu");
const Popup_1 = require("../Popup");
const DropdownMenu_classname_1 = require("./DropdownMenu.classname");
const DropdownMenuContext_1 = require("./DropdownMenuContext");
const DropdownMenuItem_1 = require("./DropdownMenuItem");
const DropdownMenuNavigationContext_1 = require("./DropdownMenuNavigationContext");
const isSeparator_1 = require("./utils/isSeparator");
const shouldSkipItemNavigation_1 = require("./utils/shouldSkipItemNavigation");
const stringifyNavigationPath_1 = require("./utils/stringifyNavigationPath");
const DropdownMenuPopup = ({ items, open, anchorRef, onClose, size, menuProps, children, popupProps, path = [], }) => {
    const { toggle, data } = react_1.default.useContext(DropdownMenuContext_1.DropdownMenuContext);
    const { activeMenuPath, setActiveMenuPath, anchorRef: navigationAnchorRef, } = react_1.default.useContext(DropdownMenuNavigationContext_1.DropdownMenuNavigationContext);
    const isSubmenu = path.length > 0;
    const activateParent = react_1.default.useCallback(() => {
        setActiveMenuPath(path.slice(0, path.length - 1));
    }, [setActiveMenuPath, path]);
    const handleMouseEnter = react_1.default.useCallback((event) => {
        var _a;
        setActiveMenuPath(path);
        (_a = popupProps === null || popupProps === void 0 ? void 0 : popupProps.onMouseEnter) === null || _a === void 0 ? void 0 : _a.call(popupProps, event);
    }, [path, popupProps, setActiveMenuPath]);
    const handleMouseLeave = react_1.default.useCallback((event) => {
        var _a;
        activateParent();
        (_a = popupProps === null || popupProps === void 0 ? void 0 : popupProps.onMouseLeave) === null || _a === void 0 ? void 0 : _a.call(popupProps, event);
    }, [activateParent, popupProps]);
    const handleSelect = react_1.default.useCallback((activeItem, event) => {
        var _a;
        if (activeItem.items && activeItem.path) {
            setActiveMenuPath(activeItem.path);
        }
        else {
            (_a = activeItem.action) === null || _a === void 0 ? void 0 : _a.call(activeItem, event, data);
            toggle(false);
        }
    }, [data, setActiveMenuPath, toggle]);
    const handleKeydown = react_1.default.useCallback((activeItemIndex, event) => {
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
    const isNavigationActive = open && (0, stringifyNavigationPath_1.stringifyNavigationPath)(path) === (0, stringifyNavigationPath_1.stringifyNavigationPath)(activeMenuPath);
    const { activeItemIndex, setActiveItemIndex, reset: resetNavigation, } = (0, hooks_1.useListNavigation)({
        items,
        skip: shouldSkipItemNavigation_1.shouldSkipItemNavigation,
        anchorRef: navigationAnchorRef,
        onAnchorKeyDown: handleKeydown,
        disabled: !isNavigationActive,
        initialValue: isSubmenu ? 0 : -1,
    });
    react_1.default.useEffect(() => {
        if (!open) {
            resetNavigation();
        }
    }, [open, resetNavigation]);
    return (react_1.default.createElement(Popup_1.Popup, Object.assign({ open: open, anchorRef: anchorRef, onClose: onClose }, popupProps, { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }), children || (react_1.default.createElement(Menu_1.Menu, Object.assign({ className: (0, DropdownMenu_classname_1.cnDropdownMenu)('menu'), size: size }, menuProps), items.map((item, index) => {
        const isActive = isNavigationActive && activeItemIndex === index;
        const activate = () => setActiveItemIndex(index);
        const extraProps = Object.assign(Object.assign({}, item.extraProps), { onMouseEnter: activate });
        return (react_1.default.createElement(DropdownMenuItem_1.DropdownMenuItem, Object.assign({ key: index, className: (0, DropdownMenu_classname_1.cnDropdownMenu)('menu-item', { separator: (0, isSeparator_1.isSeparator)(item) }, item.className), selected: isActive, popupProps: popupProps, closeMenu: onClose }, item, { extraProps: extraProps })));
    })))));
};
exports.DropdownMenuPopup = DropdownMenuPopup;
