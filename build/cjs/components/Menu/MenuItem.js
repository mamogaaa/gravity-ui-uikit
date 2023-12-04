"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const hooks_1 = require("../../hooks");
const cn_1 = require("../utils/cn");
const event_broker_1 = require("../utils/event-broker");
const b = (0, cn_1.block)('menu');
exports.MenuItem = react_1.default.forwardRef(function MenuItem({ icon, iconStart = icon, iconEnd, title, disabled, active, selected, href, target, rel, onClick, style, className, theme, extraProps, children, qa, }, ref) {
    const { onKeyDown } = (0, hooks_1.useActionHandlers)(onClick);
    const handleClickCapture = react_1.default.useCallback((event) => {
        event_broker_1.eventBroker.publish({
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
        iconStart && (react_1.default.createElement("div", { key: "icon-start", className: b('item-icon') }, iconStart)),
        react_1.default.createElement("div", { key: "content", className: b('item-content') }, children),
        iconEnd && (react_1.default.createElement("div", { key: 'icon-end', className: b('item-icon-end') }, iconEnd)),
    ];
    let item;
    if (href) {
        item = (react_1.default.createElement("a", Object.assign({}, defaultProps, extraProps, commonProps, { href: href, target: target, rel: rel }), content));
    }
    else {
        item = (react_1.default.createElement("div", Object.assign({}, defaultProps, extraProps, commonProps), content));
    }
    return (react_1.default.createElement("li", { ref: ref, className: b('list-item') }, item));
});
