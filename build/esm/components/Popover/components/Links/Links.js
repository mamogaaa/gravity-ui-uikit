import React from 'react';
import { Link } from '../../../Link';
import { cnPopover } from '../../Popover.classname';
export const Links = ({ links }) => {
    if (links.length === 0) {
        return null;
    }
    return (React.createElement("div", { className: cnPopover('tooltip-links') }, links.map((link, index) => {
        const { text, href, target = '_blank', onClick } = link;
        return (React.createElement(React.Fragment, { key: `link-${index}` },
            React.createElement(Link, { href: href, target: target, onClick: onClick, className: cnPopover('tooltip-link') }, text),
            React.createElement("br", null)));
    })));
};
