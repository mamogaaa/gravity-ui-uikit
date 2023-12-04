"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const common_1 = require("../utils/common");
const event_broker_1 = require("../utils/event-broker");
const isOfType_1 = require("../utils/isOfType");
const ButtonIcon_1 = require("./ButtonIcon");
const b = (0, cn_1.block)('button');
const ButtonWithHandlers = react_1.default.forwardRef(function Button({ view = 'normal', size = 'm', pin = 'round-round', selected, disabled = false, loading = false, width, title, tabIndex, type = 'button', component, href, target, rel, extraProps, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, children, id, style, className, qa, }, ref) {
    const handleClickCapture = react_1.default.useCallback((event) => {
        event_broker_1.eventBroker.publish({
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
        return react_1.default.createElement(component || 'a', Object.assign(Object.assign(Object.assign(Object.assign({}, extraProps), commonProps), (component ? {} : linkProps)), { ref: ref, 'aria-disabled': disabled || loading }), prepareChildren(children));
    }
    else {
        return (react_1.default.createElement("button", Object.assign({}, extraProps, commonProps, { ref: ref, type: type, disabled: disabled || loading, "aria-pressed": selected }), prepareChildren(children)));
    }
});
ButtonWithHandlers.displayName = 'Button';
exports.Button = Object.assign(ButtonWithHandlers, { Icon: ButtonIcon_1.ButtonIcon });
const isButtonIconComponent = (0, isOfType_1.isOfType)(ButtonIcon_1.ButtonIcon);
function prepareChildren(children) {
    const items = react_1.default.Children.toArray(children);
    if (items.length === 1) {
        const onlyItem = items[0];
        if (isButtonIconComponent(onlyItem)) {
            return onlyItem;
        }
        else if ((0, common_1.isIcon)(onlyItem)) {
            return react_1.default.createElement(exports.Button.Icon, { key: "icon" }, onlyItem);
        }
        else {
            return (react_1.default.createElement("span", { key: "text", className: b('text') }, onlyItem));
        }
    }
    else {
        let leftIcon, rightIcon, text;
        const content = [];
        for (const item of items) {
            const isIconElement = (0, common_1.isIcon)(item);
            const isButtonIconElement = isButtonIconComponent(item);
            if (isIconElement || isButtonIconElement) {
                if (!leftIcon && content.length === 0) {
                    const key = 'icon-left';
                    const side = 'left';
                    if (isIconElement) {
                        leftIcon = (react_1.default.createElement(exports.Button.Icon, { key: key, side: side }, item));
                    }
                    else {
                        leftIcon = react_1.default.cloneElement(item, {
                            side,
                        });
                    }
                }
                else if (!rightIcon && content.length !== 0) {
                    const key = 'icon-right';
                    const side = 'right';
                    if (isIconElement) {
                        rightIcon = (react_1.default.createElement(exports.Button.Icon, { key: key, side: side }, item));
                    }
                    else {
                        rightIcon = react_1.default.cloneElement(item, {
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
            text = (react_1.default.createElement("span", { key: "text", className: b('text') }, content));
        }
        return [leftIcon, rightIcon, text];
    }
}
