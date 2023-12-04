import React from 'react';
import { useActionHandlers } from '../../../hooks';
import { blockNew } from '../../utils/cn';
import './TocItem.css';
const b = blockNew('toc-item');
export const TocItem = (props) => {
    const { active = false, childItem = false, content, href, value, onClick } = props;
    const handleClick = React.useCallback(() => {
        if (value === undefined || !onClick) {
            return;
        }
        onClick(value);
    }, [onClick, value]);
    const { onKeyDown } = useActionHandlers(handleClick);
    const item = href === undefined ? (React.createElement("div", { role: "button", tabIndex: 0, className: b('section-link'), onClick: handleClick, onKeyDown: onKeyDown }, content)) : (React.createElement("a", { href: href, onClick: handleClick, className: b('section-link') }, content));
    return React.createElement("div", { className: b('section', { child: childItem, active }) }, item);
};
