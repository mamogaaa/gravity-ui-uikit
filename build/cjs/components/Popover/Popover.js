"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Button_1 = require("../Button");
const Icon_1 = require("../Icon");
const Popup_1 = require("../Popup");
const Popover_classname_1 = require("./Popover.classname");
const Buttons_1 = require("./components/Buttons/Buttons");
const Content_1 = require("./components/Content/Content");
const Links_1 = require("./components/Links/Links");
const Trigger_1 = require("./components/Trigger/Trigger");
const config_1 = require("./config");
const useOpen_1 = require("./hooks/useOpen");
exports.Popover = react_1.default.forwardRef(function ({ initialOpen = false, disabled = false, autoclosable = true, openOnHover = true, delayOpening, delayClosing, behavior = config_1.PopoverBehavior.Delayed, placement = ['right', 'bottom'], offset = {}, tooltipOffset, tooltipClassName, tooltipContentClassName, theme = 'info', size = 's', hasArrow = true, hasClose = false, className, children, title, content, htmlContent, contentClassName, links, forceLinksAppearance = false, tooltipActionButton, tooltipCancelButton, onOpenChange, onCloseClick, onClick, anchorRef, strategy, qa, disablePortal = false, tooltipId, focusTrap, autoFocus, restoreFocusRef, modifiers, }, ref) {
    const controlRef = react_1.default.useRef(null);
    const closedManually = react_1.default.useRef(false);
    const shouldBeOpen = react_1.default.useRef(initialOpen);
    const { isOpen, closingTimeout, openTooltip, openTooltipDelayed, unsetOpeningTimeout, closeTooltip, closeTooltipDelayed, unsetClosingTimeout, } = (0, useOpen_1.useOpen)({
        initialOpen,
        disabled,
        autoclosable,
        onOpenChange,
        delayOpening,
        delayClosing,
        behavior,
        shouldBeOpen,
    });
    react_1.default.useImperativeHandle(ref, () => ({
        openTooltip,
        closeTooltip,
    }), [openTooltip, closeTooltip]);
    const handleCloseClick = async (event) => {
        closeTooltip();
        onCloseClick === null || onCloseClick === void 0 ? void 0 : onCloseClick(event);
    };
    const hasTitle = Boolean(title);
    const tooltip = (react_1.default.createElement(Popup_1.Popup, { id: tooltipId, role: openOnHover ? 'tooltip' : 'dialog', strategy: strategy, anchorRef: anchorRef || controlRef, className: (0, Popover_classname_1.cnPopover)('tooltip', {
            theme,
            size,
            ['with-close']: hasClose,
            'force-links-appearance': forceLinksAppearance,
        }, tooltipClassName), contentClassName: (0, Popover_classname_1.cnPopover)('tooltip-popup-content', tooltipContentClassName), open: isOpen, placement: placement, hasArrow: hasArrow, offset: tooltipOffset, onClose: anchorRef ? undefined : closeTooltip, qa: qa ? `${qa}-tooltip` : '', disablePortal: disablePortal, focusTrap: focusTrap, autoFocus: autoFocus, restoreFocus: true, restoreFocusRef: restoreFocusRef || controlRef, modifiers: modifiers },
        react_1.default.createElement(react_1.default.Fragment, null,
            title && react_1.default.createElement("h3", { className: (0, Popover_classname_1.cnPopover)('tooltip-title') }, title),
            react_1.default.createElement(Content_1.Content, { secondary: hasTitle ? theme !== 'announcement' : false, content: content, htmlContent: htmlContent, className: contentClassName }),
            links && react_1.default.createElement(Links_1.Links, { links: links }),
            react_1.default.createElement(Buttons_1.Buttons, { theme: theme, tooltipActionButton: tooltipActionButton, tooltipCancelButton: tooltipCancelButton }),
            hasClose && (react_1.default.createElement("div", { className: (0, Popover_classname_1.cnPopover)('tooltip-close') },
                react_1.default.createElement(Button_1.Button, { size: "s", view: "flat-secondary", onClick: handleCloseClick, extraProps: {
                        'aria-label': 'Close',
                    } },
                    react_1.default.createElement(Icon_1.Icon, { data: icons_1.Xmark, size: 16 })))))));
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
    return (react_1.default.createElement("div", { ref: controlRef, className: (0, Popover_classname_1.cnPopover)({ disabled }, className), onMouseEnter: openOnHover ? onMouseEnter : undefined, onMouseLeave: openOnHover ? onMouseLeave : undefined, onFocus: openOnHover ? onMouseEnter : undefined, onBlur: openOnHover ? onMouseLeave : undefined, style: {
            top: offset.top,
            left: offset.left,
        }, "data-qa": qa },
        react_1.default.createElement(Trigger_1.Trigger, { closeTooltip: closeTooltip, openTooltip: openTooltip, open: isOpen, openOnHover: openOnHover, className: (0, Popover_classname_1.cnPopover)('handler'), disabled: disabled, onClick: onClick, closedManually: closedManually }, children),
        tooltip));
});
exports.Popover.displayName = 'Popover';
