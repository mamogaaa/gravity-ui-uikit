"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const hooks_1 = require("../../hooks");
const Button_1 = require("../Button");
const ClipboardIcon_1 = require("../ClipboardIcon");
const CopyToClipboard_1 = require("../CopyToClipboard");
const Icon_1 = require("../Icon");
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('label');
const sizeMap = {
    xs: { copyIconSize: 12, closeIconSize: 12, buttonSize: 'xs' },
    s: { copyIconSize: 14, closeIconSize: 14, buttonSize: 's' },
    m: { copyIconSize: 16, closeIconSize: 16, buttonSize: 'm' },
};
const commonActionButtonProps = {
    pin: 'brick-round',
    className: b('addon', {
        side: 'right',
        interactive: true,
    }),
};
exports.Label = react_1.default.forwardRef(function Label(props, ref) {
    const { type = 'default', theme = 'normal', size = 'xs', icon, children, onClose, className, disabled, copyText, closeButtonLabel, copyButtonLabel, interactive = false, value, onCopy, onClick, } = props;
    const actionButtonRef = react_1.default.useRef(null);
    const hasContent = Boolean(children !== '' && react_1.default.Children.count(children) > 0);
    const typeClose = type === 'close' && hasContent;
    const typeCopy = type === 'copy' && hasContent;
    const hasOnClick = Boolean(onClick);
    const hasCopy = Boolean(typeCopy && copyText);
    const isInteractive = (hasOnClick || hasCopy || interactive) && !disabled;
    const { copyIconSize, closeIconSize, buttonSize } = sizeMap[size];
    const leftIcon = icon && (react_1.default.createElement("div", { className: b('addon', { side: hasContent ? 'left' : undefined }) }, icon));
    const content = hasContent && (react_1.default.createElement("div", { className: b('text') },
        react_1.default.createElement("div", { className: b('content') }, children),
        Boolean(value) && (react_1.default.createElement("div", { className: b('value') },
            react_1.default.createElement("div", { className: b('separator') }, ":"),
            react_1.default.createElement("div", { className: b('key') }, value)))));
    const handleCloseClick = (event) => {
        if (hasOnClick) {
            /* preventing event from bubbling */
            event.stopPropagation();
        }
        if (onClose) {
            onClose(event);
        }
    };
    const handleClick = (event) => {
        var _a;
        /**
         * Triggered only if the handler was triggered on the element itself, and not on the actionButton
         * It is necessary that keyboard navigation works correctly
         */
        if (!((_a = actionButtonRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
            onClick === null || onClick === void 0 ? void 0 : onClick(event);
        }
    };
    const { onKeyDown } = (0, hooks_1.useActionHandlers)(handleClick);
    const renderLabel = (status) => {
        let actionButton;
        if (typeCopy) {
            actionButton = (react_1.default.createElement(Button_1.Button, Object.assign({ ref: actionButtonRef, size: buttonSize, extraProps: { 'aria-label': copyButtonLabel || undefined } }, commonActionButtonProps),
                react_1.default.createElement(Button_1.Button.Icon, null,
                    react_1.default.createElement(ClipboardIcon_1.ClipboardIcon, { status: status || CopyToClipboard_1.CopyToClipboardStatus.Pending, size: copyIconSize }))));
        }
        else if (typeClose) {
            actionButton = (react_1.default.createElement(Button_1.Button, Object.assign({ ref: actionButtonRef, onClick: onClose ? handleCloseClick : undefined, size: buttonSize, extraProps: { 'aria-label': closeButtonLabel || undefined } }, commonActionButtonProps),
                react_1.default.createElement(Icon_1.Icon, { size: closeIconSize, data: icons_1.Xmark })));
        }
        return (react_1.default.createElement("div", { ref: ref, role: hasOnClick ? 'button' : undefined, tabIndex: hasOnClick ? 0 : undefined, onClick: hasOnClick ? handleClick : undefined, onKeyDown: hasOnClick ? onKeyDown : undefined, className: b({
                theme,
                size,
                type,
                'is-interactive': isInteractive,
                'has-right-addon': Boolean(actionButton),
                'has-left-addon': Boolean(leftIcon),
                disabled,
            }, className) },
            leftIcon,
            content,
            actionButton));
    };
    if (hasCopy && copyText && !hasOnClick) {
        return (react_1.default.createElement(CopyToClipboard_1.CopyToClipboard, { text: copyText, onCopy: onCopy, timeout: 1000 }, (status) => renderLabel(status)));
    }
    return renderLabel();
});
