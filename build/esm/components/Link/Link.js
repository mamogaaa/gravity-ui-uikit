import React from 'react';
import { block } from '../utils/cn';
import { eventBroker } from '../utils/event-broker';
import './Link.css';
const b = block('link');
export const Link = React.forwardRef(function Link({ view = 'normal', visitable, href, target, rel, title, children, extraProps, onClick, onFocus, onBlur, id, style, className, qa, }, ref) {
    const handleClickCapture = React.useCallback((event) => {
        eventBroker.publish({
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
        return (React.createElement("a", Object.assign({}, extraProps, commonProps, { ref: ref, href: href, target: target, rel: relProp }), children));
    }
    else {
        return (React.createElement("span", Object.assign({}, extraProps, commonProps, { ref: ref, 
            // as this element has onClick handler
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex: 0 }), children));
    }
});
