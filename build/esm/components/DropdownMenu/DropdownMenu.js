import React from 'react';
import { Ellipsis } from '@gravity-ui/icons';
import { useActionHandlers } from '../../hooks/useActionHandlers';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { cnDropdownMenu } from './DropdownMenu.classname';
import { DropdownMenuContext } from './DropdownMenuContext';
import { DropdownMenuItem as DropdownMenuItemComponent } from './DropdownMenuItem';
import { DropdownMenuNavigationContextProvider } from './DropdownMenuNavigationContext';
import { DropdownMenuPopup } from './DropdownMenuPopup';
import { dropdownMenuSeparator } from './constants';
import { usePopupVisibility } from './hooks/usePopupVisibility';
import { useScrollHandler } from './hooks/useScrollHandler';
import { toItemList } from './utils/toItemList';
import './DropdownMenu.css';
const DropdownMenu = ({ items = [], size = 'm', icon = React.createElement(Icon, { data: Ellipsis }), open, onOpenToggle, hideOnScroll = true, data, disabled, switcher, renderSwitcher, switcherWrapperClassName, defaultSwitcherProps, defaultSwitcherClassName, onSwitcherClick, menuProps, popupProps, children, }) => {
    const anchorRef = React.useRef(null);
    const { isPopupShown, togglePopup, closePopup } = usePopupVisibility(open, onOpenToggle, disabled);
    useScrollHandler(closePopup, anchorRef, !isPopupShown || !hideOnScroll);
    const contextValue = React.useMemo(() => ({
        toggle: togglePopup,
        data,
    }), [data, togglePopup]);
    const itemsList = React.useMemo(() => toItemList(items, dropdownMenuSeparator), [items]);
    const handleSwitcherClick = React.useCallback((event) => {
        if (disabled) {
            return;
        }
        onSwitcherClick === null || onSwitcherClick === void 0 ? void 0 : onSwitcherClick(event);
        togglePopup();
    }, [disabled, onSwitcherClick, togglePopup]);
    const { onKeyDown: handleSwitcherKeyDown } = useActionHandlers(handleSwitcherClick);
    const switcherProps = React.useMemo(() => ({
        onClick: handleSwitcherClick,
        onKeyDown: handleSwitcherKeyDown,
    }), [handleSwitcherClick, handleSwitcherKeyDown]);
    return (React.createElement(DropdownMenuContext.Provider, { value: contextValue },
        React.createElement("div", Object.assign({ ref: anchorRef, className: cnDropdownMenu('switcher-wrapper', switcherWrapperClassName) }, (renderSwitcher ? {} : switcherProps)), (renderSwitcher === null || renderSwitcher === void 0 ? void 0 : renderSwitcher(switcherProps)) || switcher || (React.createElement(Button, Object.assign({ view: "flat", size: size }, defaultSwitcherProps, { className: cnDropdownMenu('switcher-button', defaultSwitcherClassName), disabled: disabled }), icon))),
        React.createElement(DropdownMenuNavigationContextProvider, { anchorRef: anchorRef, disabled: !isPopupShown },
            React.createElement(DropdownMenuPopup, { items: itemsList, open: isPopupShown, size: size, menuProps: menuProps, anchorRef: anchorRef, onClose: closePopup, popupProps: popupProps }, children))));
};
const DropdownMenuExport = Object.assign(DropdownMenu, { Item: DropdownMenuItemComponent });
export { DropdownMenuExport as DropdownMenu };
