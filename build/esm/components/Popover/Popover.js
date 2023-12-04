import React from 'react';
import { Xmark } from '@gravity-ui/icons';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Popup } from '../Popup';
import { cnPopover } from './Popover.classname';
import { Buttons } from './components/Buttons/Buttons';
import { Content } from './components/Content/Content';
import { Links } from './components/Links/Links';
import { Trigger } from './components/Trigger/Trigger';
import { PopoverBehavior } from './config';
import { useOpen } from './hooks/useOpen';
import './Popover.css';
export const Popover = React.forwardRef(function ({ initialOpen = false, disabled = false, autoclosable = true, openOnHover = true, delayOpening, delayClosing, behavior = PopoverBehavior.Delayed, placement = ['right', 'bottom'], offset = {}, tooltipOffset, tooltipClassName, tooltipContentClassName, theme = 'info', size = 's', hasArrow = true, hasClose = false, className, children, title, content, htmlContent, contentClassName, links, forceLinksAppearance = false, tooltipActionButton, tooltipCancelButton, onOpenChange, onCloseClick, onClick, anchorRef, strategy, qa, disablePortal = false, tooltipId, focusTrap, autoFocus, restoreFocusRef, modifiers, }, ref) {
    const controlRef = React.useRef(null);
    const closedManually = React.useRef(false);
    const shouldBeOpen = React.useRef(initialOpen);
    const { isOpen, closingTimeout, openTooltip, openTooltipDelayed, unsetOpeningTimeout, closeTooltip, closeTooltipDelayed, unsetClosingTimeout, } = useOpen({
        initialOpen,
        disabled,
        autoclosable,
        onOpenChange,
        delayOpening,
        delayClosing,
        behavior,
        shouldBeOpen,
    });
    React.useImperativeHandle(ref, () => ({
        openTooltip,
        closeTooltip,
    }), [openTooltip, closeTooltip]);
    const handleCloseClick = async (event) => {
        closeTooltip();
        onCloseClick === null || onCloseClick === void 0 ? void 0 : onCloseClick(event);
    };
    const hasTitle = Boolean(title);
    const tooltip = (React.createElement(Popup, { id: tooltipId, role: openOnHover ? 'tooltip' : 'dialog', strategy: strategy, anchorRef: anchorRef || controlRef, className: cnPopover('tooltip', {
            theme,
            size,
            ['with-close']: hasClose,
            'force-links-appearance': forceLinksAppearance,
        }, tooltipClassName), contentClassName: cnPopover('tooltip-popup-content', tooltipContentClassName), open: isOpen, placement: placement, hasArrow: hasArrow, offset: tooltipOffset, onClose: anchorRef ? undefined : closeTooltip, qa: qa ? `${qa}-tooltip` : '', disablePortal: disablePortal, focusTrap: focusTrap, autoFocus: autoFocus, restoreFocus: true, restoreFocusRef: restoreFocusRef || controlRef, modifiers: modifiers },
        React.createElement(React.Fragment, null,
            title && React.createElement("h3", { className: cnPopover('tooltip-title') }, title),
            React.createElement(Content, { secondary: hasTitle ? theme !== 'announcement' : false, content: content, htmlContent: htmlContent, className: contentClassName }),
            links && React.createElement(Links, { links: links }),
            React.createElement(Buttons, { theme: theme, tooltipActionButton: tooltipActionButton, tooltipCancelButton: tooltipCancelButton }),
            hasClose && (React.createElement("div", { className: cnPopover('tooltip-close') },
                React.createElement(Button, { size: "s", view: "flat-secondary", onClick: handleCloseClick, extraProps: {
                        'aria-label': 'Close',
                    } },
                    React.createElement(Icon, { data: Xmark, size: 16 })))))));
    if (anchorRef) {
        return tooltip;
    }
    const onMouseEnter = () => {
        unsetClosingTimeout();
        if (!isOpen && !disabled && !closedManually.current) {
            openTooltipDelayed();
        }
        else {
            shouldBeOpen.current = true;
        }
    };
    const onMouseLeave = () => {
        if (autoclosable && !closedManually.current && !closingTimeout.current) {
            unsetOpeningTimeout();
            closeTooltipDelayed();
        }
        else {
            shouldBeOpen.current = false;
        }
        closedManually.current = false;
    };
    return (React.createElement("div", { ref: controlRef, className: cnPopover({ disabled }, className), onMouseEnter: openOnHover ? onMouseEnter : undefined, onMouseLeave: openOnHover ? onMouseLeave : undefined, onFocus: openOnHover ? onMouseEnter : undefined, onBlur: openOnHover ? onMouseLeave : undefined, style: {
            top: offset.top,
            left: offset.left,
        }, "data-qa": qa },
        React.createElement(Trigger, { closeTooltip: closeTooltip, openTooltip: openTooltip, open: isOpen, openOnHover: openOnHover, className: cnPopover('handler'), disabled: disabled, onClick: onClick, closedManually: closedManually }, children),
        tooltip));
});
Popover.displayName = 'Popover';
