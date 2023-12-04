"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenu = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const useActionHandlers_1 = require("../../hooks/useActionHandlers");
const Button_1 = require("../Button");
const Icon_1 = require("../Icon");
const DropdownMenu_classname_1 = require("./DropdownMenu.classname");
const DropdownMenuContext_1 = require("./DropdownMenuContext");
const DropdownMenuItem_1 = require("./DropdownMenuItem");
const DropdownMenuNavigationContext_1 = require("./DropdownMenuNavigationContext");
const DropdownMenuPopup_1 = require("./DropdownMenuPopup");
const constants_1 = require("./constants");
const usePopupVisibility_1 = require("./hooks/usePopupVisibility");
const useScrollHandler_1 = require("./hooks/useScrollHandler");
const toItemList_1 = require("./utils/toItemList");
const DropdownMenu = ({ items = [], size = 'm', icon = react_1.default.createElement(Icon_1.Icon, { data: icons_1.Ellipsis }), open, onOpenToggle, hideOnScroll = true, data, disabled, switcher, renderSwitcher, switcherWrapperClassName, defaultSwitcherProps, defaultSwitcherClassName, onSwitcherClick, menuProps, popupProps, children, }) => {
    const anchorRef = react_1.default.useRef(null);
    const { isPopupShown, togglePopup, closePopup } = (0, usePopupVisibility_1.usePopupVisibility)(open, onOpenToggle, disabled);
    (0, useScrollHandler_1.useScrollHandler)(closePopup, anchorRef, !isPopupShown || !hideOnScroll);
    const contextValue = react_1.default.useMemo(() => ({
        toggle: togglePopup,
        data,
    }), [data, togglePopup]);
    const itemsList = react_1.default.useMemo(() => (0, toItemList_1.toItemList)(items, constants_1.dropdownMenuSeparator), [items]);
    const handleSwitcherClick = react_1.default.useCallback((event) => {
        if (disabled) {
            return;
        }
        onSwitcherClick === null || onSwitcherClick === void 0 ? void 0 : onSwitcherClick(event);
        togglePopup();
    }, [disabled, onSwitcherClick, togglePopup]);
    const { onKeyDown: handleSwitcherKeyDown } = (0, useActionHandlers_1.useActionHandlers)(handleSwitcherClick);
    const switcherProps = react_1.default.useMemo(() => ({
        onClick: handleSwitcherClick,
        onKeyDown: handleSwitcherKeyDown,
    }), [handleSwitcherClick, handleSwitcherKeyDown]);
    return (react_1.default.createElement(DropdownMenuContext_1.DropdownMenuContext.Provider, { value: contextValue },
        react_1.default.createElement("div", Object.assign({ ref: anchorRef, className: (0, DropdownMenu_classname_1.cnDropdownMenu)('switcher-wrapper', switcherWrapperClassName) }, (renderSwitcher ? {} : switcherProps)), (renderSwitcher === null || renderSwitcher === void 0 ? void 0 : renderSwitcher(switcherProps)) || switcher || (react_1.default.createElement(Button_1.Button, Object.assign({ view: "flat", size: size }, defaultSwitcherProps, { className: (0, DropdownMenu_classname_1.cnDropdownMenu)('switcher-button', defaultSwitcherClassName), disabled: disabled }), icon))),
        react_1.default.createElement(DropdownMenuNavigationContext_1.DropdownMenuNavigationContextProvider, { anchorRef: anchorRef, disabled: !isPopupShown },
            react_1.default.createElement(DropdownMenuPopup_1.DropdownMenuPopup, { items: itemsList, open: isPopupShown, size: size, menuProps: menuProps, anchorRef: anchorRef, onClose: closePopup, popupProps: popupProps }, children))));
};
const DropdownMenuExport = Object.assign(DropdownMenu, { Item: DropdownMenuItem_1.DropdownMenuItem });
exports.DropdownMenu = DropdownMenuExport;
