import React from 'react';
import { Xmark } from '@gravity-ui/icons';
import { useActionHandlers } from '../../hooks';
import { Button } from '../Button';
import { ClipboardIcon } from '../ClipboardIcon';
import { CopyToClipboard, CopyToClipboardStatus } from '../CopyToClipboard';
import { Icon } from '../Icon';
import { block } from '../utils/cn';
import './Label.css';
const b = block('label');
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
export const Label = React.forwardRef(function Label(props, ref) {
    const { type = 'default', theme = 'normal', size = 'xs', icon, children, onClose, className, disabled, copyText, closeButtonLabel, copyButtonLabel, interactive = false, value, onCopy, onClick, } = props;
    const actionButtonRef = React.useRef(null);
    const hasContent = Boolean(children !== '' && React.Children.count(children) > 0);
    const typeClose = type === 'close' && hasContent;
    const typeCopy = type === 'copy' && hasContent;
    const hasOnClick = Boolean(onClick);
    const hasCopy = Boolean(typeCopy && copyText);
    const isInteractive = (hasOnClick || hasCopy || interactive) && !disabled;
    const { copyIconSize, closeIconSize, buttonSize } = sizeMap[size];
    const leftIcon = icon && (React.createElement("div", { className: b('addon', { side: hasContent ? 'left' : undefined }) }, icon));
    const content = hasContent && (React.createElement("div", { className: b('text') },
        React.createElement("div", { className: b('content') }, children),
        Boolean(value) && (React.createElement("div", { className: b('value') },
            React.createElement("div", { className: b('separator') }, ":"),
            React.createElement("div", { className: b('key') }, value)))));
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
    const { onKeyDown } = useActionHandlers(handleClick);
    const renderLabel = (status) => {
        let actionButton;
        if (typeCopy) {
            actionButton = (React.createElement(Button, Object.assign({ ref: actionButtonRef, size: buttonSize, extraProps: { 'aria-label': copyButtonLabel || undefined } }, commonActionButtonProps),
                React.createElement(Button.Icon, null,
                    React.createElement(ClipboardIcon, { status: status || CopyToClipboardStatus.Pending, size: copyIconSize }))));
        }
        else if (typeClose) {
            actionButton = (React.createElement(Button, Object.assign({ ref: actionButtonRef, onClick: onClose ? handleCloseClick : undefined, size: buttonSize, extraProps: { 'aria-label': closeButtonLabel || undefined } }, commonActionButtonProps),
                React.createElement(Icon, { size: closeIconSize, data: Xmark })));
        }
        return (React.createElement("div", { ref: ref, role: hasOnClick ? 'button' : undefined, tabIndex: hasOnClick ? 0 : undefined, onClick: hasOnClick ? handleClick : undefined, onKeyDown: hasOnClick ? onKeyDown : undefined, className: b({
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
        return (React.createElement(CopyToClipboard, { text: copyText, onCopy: onCopy, timeout: 1000 }, (status) => renderLabel(status)));
    }
    return renderLabel();
});
