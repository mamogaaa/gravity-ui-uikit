import React from 'react';
import { block } from '../utils/cn';
import { isIcon } from '../utils/common';
import { eventBroker } from '../utils/event-broker';
import { isOfType } from '../utils/isOfType';
import { ButtonIcon } from './ButtonIcon';
import './Button.css';
const b = block('button');
const ButtonWithHandlers = React.forwardRef(function Button({ view = 'normal', size = 'm', pin = 'round-round', selected, disabled = false, loading = false, width, title, tabIndex, type = 'button', component, href, target, rel, extraProps, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, children, id, style, className, qa, }, ref) {
    const handleClickCapture = React.useCallback((event) => {
        eventBroker.publish({
            componentId: 'Button',
            eventId: 'click',
            domEvent: event,
            meta: {
                content: event.currentTarget.textContent,
                view,
            },
        });
    }, [view]);
    const commonProps = {
        title,
        tabIndex,
        onClick,
        onClickCapture: handleClickCapture,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        id,
        style,
        className: b({
            view,
            size,
            pin,
            selected,
            disabled: disabled || loading,
            loading,
            width,
        }, className),
        'data-qa': qa,
    };
    if (typeof href === 'string' || component) {
        const linkProps = {
            href,
            target,
            rel: target === '_blank' && !rel ? 'noopener noreferrer' : rel,
        };
        return React.createElement(component || 'a', Object.assign(Object.assign(Object.assign(Object.assign({}, extraProps), commonProps), (component ? {} : linkProps)), { ref: ref, 'aria-disabled': disabled || loading }), prepareChildren(children));
    }
    else {
        return (React.createElement("button", Object.assign({}, extraProps, commonProps, { ref: ref, type: type, disabled: disabled || loading, "aria-pressed": selected }), prepareChildren(children)));
    }
});
ButtonWithHandlers.displayName = 'Button';
export const Button = Object.assign(ButtonWithHandlers, { Icon: ButtonIcon });
const isButtonIconComponent = isOfType(ButtonIcon);
function prepareChildren(children) {
    const items = React.Children.toArray(children);
    if (items.length === 1) {
        const onlyItem = items[0];
        if (isButtonIconComponent(onlyItem)) {
            return onlyItem;
        }
        else if (isIcon(onlyItem)) {
            return React.createElement(Button.Icon, { key: "icon" }, onlyItem);
        }
        else {
            return (React.createElement("span", { key: "text", className: b('text') }, onlyItem));
        }
    }
    else {
        let leftIcon, rightIcon, text;
        const content = [];
        for (const item of items) {
            const isIconElement = isIcon(item);
            const isButtonIconElement = isButtonIconComponent(item);
            if (isIconElement || isButtonIconElement) {
                if (!leftIcon && content.length === 0) {
                    const key = 'icon-left';
                    const side = 'left';
                    if (isIconElement) {
                        leftIcon = (React.createElement(Button.Icon, { key: key, side: side }, item));
                    }
                    else {
                        leftIcon = React.cloneElement(item, {
                            side,
                        });
                    }
                }
                else if (!rightIcon && content.length !== 0) {
                    const key = 'icon-right';
                    const side = 'right';
                    if (isIconElement) {
                        rightIcon = (React.createElement(Button.Icon, { key: key, side: side }, item));
                    }
                    else {
                        rightIcon = React.cloneElement(item, {
                            side,
                        });
                    }
                }
            }
            else {
                content.push(item);
            }
        }
        if (content.length > 0) {
            text = (React.createElement("span", { key: "text", className: b('text') }, content));
        }
        return [leftIcon, rightIcon, text];
    }
}
