import React from 'react';
import { Xmark } from '@gravity-ui/icons';
import { Icon } from '../Icon';
import { block } from '../utils/cn';
import './PersonaWrap.css';
const b = block('persona');
export function PersonaWrap({ size = 's', theme = 'default', isEmpty, onClick, onClose, className, avatar, children, style, closeButtonAriaAttributes, }) {
    const clickable = Boolean(onClick);
    const closeable = Boolean(onClose);
    const MainComponent = clickable ? 'button' : 'div';
    return (React.createElement("div", { className: b({ size, theme, clickable, closeable, empty: isEmpty }, className), style: style },
        React.createElement(MainComponent, { onClick: onClick, className: b('main') },
            avatar && React.createElement("div", { className: b('avatar') }, avatar),
            React.createElement("div", { className: b('text') }, children)),
        onClose && (React.createElement("button", Object.assign({ className: b('close'), onClick: onClose }, closeButtonAriaAttributes),
            React.createElement(Icon, { data: Xmark, size: 12, className: b('close-icon') })))));
}
PersonaWrap.displayName = 'PersonaWrap';
