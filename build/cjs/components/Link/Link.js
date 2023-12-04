"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const event_broker_1 = require("../utils/event-broker");
const b = (0, cn_1.block)('link');
exports.Link = react_1.default.forwardRef(function Link({ view = 'normal', visitable, href, target, rel, title, children, extraProps, onClick, onFocus, onBlur, id, style, className, qa, }, ref) {
    const handleClickCapture = react_1.default.useCallback((event) => {
        event_broker_1.eventBroker.publish({
            componentId: 'Link',
            eventId: 'click',
            domEvent: event,
        });
    }, []);
    const commonProps = {
        title,
        onClick,
        onClickCapture: handleClickCapture,
        onFocus,
        onBlur,
        id,
        style,
        className: b({ view, visitable }, className),
        'data-qa': qa,
    };
    if (typeof href === 'string') {
        const relProp = target === '_blank' && !rel ? 'noopener noreferrer' : rel;
        return (react_1.default.createElement("a", Object.assign({}, extraProps, commonProps, { ref: ref, href: href, target: target, rel: relProp }), children));
    }
    else {
        return (react_1.default.createElement("span", Object.assign({}, extraProps, commonProps, { ref: ref, 
            // as this element has onClick handler
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex: 0 }), children));
    }
});
