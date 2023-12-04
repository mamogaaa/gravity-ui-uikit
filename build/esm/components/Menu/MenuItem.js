import React from 'react';
import { useActionHandlers } from '../../hooks';
import { block } from '../utils/cn';
import { eventBroker } from '../utils/event-broker';
const b = block('menu');
export const MenuItem = React.forwardRef(function MenuItem({ icon, iconStart = icon, iconEnd, title, disabled, active, selected, href, target, rel, onClick, style, className, theme, extraProps, children, qa, }, ref) {
    const { onKeyDown } = useActionHandlers(onClick);
    const handleClickCapture = React.useCallback((event) => {
        eventBroker.publish({
            componentId: 'MenuItem',
            eventId: 'click',
            domEvent: event,
        });
    }, []);
    const defaultProps = {
        role: 'menuitem',
        onKeyDown: onClick && !disabled ? onKeyDown : undefined,
    };
    const commonProps = {
        title,
        onClick: disabled ? undefined : onClick,
        onClickCapture: disabled ? undefined : handleClickCapture,
        style,
        tabIndex: disabled ? -1 : 0,
        className: b('item', { disabled, active, selected, theme }, className),
        'data-qa': qa,
    };
    const content = [
        iconStart && (React.createElement("div", { key: "icon-start", className: b('item-icon') }, iconStart)),
        React.createElement("div", { key: "content", className: b('item-content') }, children),
        iconEnd && (React.createElement("div", { key: 'icon-end', className: b('item-icon-end') }, iconEnd)),
    ];
    let item;
    if (href) {
        item = (React.createElement("a", Object.assign({}, defaultProps, extraProps, commonProps, { href: href, target: target, rel: rel }), content));
    }
    else {
        item = (React.createElement("div", Object.assign({}, defaultProps, extraProps, commonProps), content));
    }
    return (React.createElement("li", { ref: ref, className: b('list-item') }, item));
});
