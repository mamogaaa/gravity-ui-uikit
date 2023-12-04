import { __rest } from "tslib";
import React from 'react';
import { Button } from '../Button';
import { ClipboardIcon } from '../ClipboardIcon';
import { CopyToClipboard } from '../CopyToClipboard';
import { CopyToClipboardStatus } from '../CopyToClipboard/types';
import { Tooltip } from '../Tooltip';
import { block } from '../utils/cn';
import i18n from './i18n';
import './ClipboardButton.css';
const b = block('clipboard-button');
const DEFAULT_ICON_SIZE = 24;
const DEFAULT_TIMEOUT = 1000;
const ClipboardButtonComponent = (props) => {
    const { size = DEFAULT_ICON_SIZE, className, qa, hasTooltip = true, tooltipInitialText = i18n('startCopy'), tooltipSuccessText = i18n('endCopy'), status, onClick, } = props;
    const buttonRef = React.useRef(null);
    React.useEffect(() => {
        var _a;
        (_a = buttonRef === null || buttonRef === void 0 ? void 0 : buttonRef.current) === null || _a === void 0 ? void 0 : _a.style.setProperty('--yc-button-height', `${size}px`);
    }, [size]);
    return (React.createElement(Tooltip, { disabled: !hasTooltip, content: status === CopyToClipboardStatus.Success ? tooltipSuccessText : tooltipInitialText },
        React.createElement(Button, { ref: buttonRef, view: "flat", className: b(null, className), qa: qa, onClick: onClick },
            React.createElement(Button.Icon, null,
                React.createElement(ClipboardIcon, { status: status, size: size, className: b('icon') })))));
};
export function ClipboardButton(props) {
    const { text, timeout = DEFAULT_TIMEOUT, onCopy, options } = props, buttonProps = __rest(props, ["text", "timeout", "onCopy", "options"]);
    return (React.createElement(CopyToClipboard, { text: text, timeout: timeout, onCopy: onCopy, options: options }, (status) => React.createElement(ClipboardButtonComponent, Object.assign({}, buttonProps, { status: status }))));
}
