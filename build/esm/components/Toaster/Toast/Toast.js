import React from 'react';
import { CircleCheck, CircleInfo, Thunderbolt, TriangleExclamation, Xmark } from '@gravity-ui/icons';
import { useCloseOnTimeout } from '../../../hooks/private';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { block } from '../../utils/cn';
import i18n from '../i18n';
import './Toast.css';
const b = block('toast');
const DEFAULT_TIMEOUT = 5000;
const TITLE_ICONS = {
    info: CircleInfo,
    success: CircleCheck,
    warning: TriangleExclamation,
    error: TriangleExclamation,
    utility: Thunderbolt,
};
function renderActions({ actions, onClose }) {
    if (!actions || !actions.length) {
        return null;
    }
    return (React.createElement("div", { className: b('actions') }, actions.map(({ label, onClick, view = 'outlined', removeAfterClick = true }, index) => {
        const onActionClick = () => {
            onClick();
            if (removeAfterClick) {
                onClose();
            }
        };
        return (React.createElement(Button, { key: `${label}__${index}`, className: b('action'), onClick: onActionClick, type: "button", size: 'l', view: view, width: "auto" }, label));
    })));
}
function renderIconByType({ type }) {
    if (!type) {
        return null;
    }
    return React.createElement(Icon, { data: TITLE_ICONS[type], size: 20, className: b('icon', { [type]: true }) });
}
export const Toast = React.forwardRef(function Toast(props, ref) {
    const { name, content, actions, title, className, type, renderIcon, autoHiding: timeoutProp = DEFAULT_TIMEOUT, isClosable = true, mobile = false, removeCallback, } = props;
    const onClose = React.useCallback(() => removeCallback(name), [removeCallback, name]);
    const timeout = typeof timeoutProp === 'number' ? timeoutProp : undefined;
    const closeOnTimeoutProps = useCloseOnTimeout({ onClose, timeout });
    const mods = {
        mobile,
        [type || 'default']: true,
    };
    const hasTitle = Boolean(title);
    const hasContent = Boolean(content);
    const icon = renderIcon ? renderIcon(props) : renderIconByType({ type });
    return (React.createElement("div", Object.assign({ ref: ref, className: b(mods, className) }, closeOnTimeoutProps, { "data-toast": true }),
        icon && React.createElement("div", { className: b('icon-container') }, icon),
        React.createElement("div", { className: b('container') },
            hasTitle && React.createElement("h3", { className: b('title') }, title),
            isClosable && (React.createElement(Button, { size: 's', view: "flat", className: b('btn-close'), onClick: onClose, extraProps: { 'aria-label': i18n('label_close-button') } },
                React.createElement(Icon, { data: Xmark }))),
            hasContent && (React.createElement("div", { className: b('content', { 'without-title': !hasTitle }) }, content)),
            renderActions({ actions, onClose }))));
});
