import React from 'react';
import { UserAvatar } from '../UserAvatar';
import { block } from '../utils/cn';
import './User.css';
const b = block('user');
export function User({ name, description, imgUrl, size = 'm', className }) {
    const compact = size === 'xs';
    return (React.createElement("div", { className: b({ size }, className) },
        imgUrl && React.createElement(UserAvatar, { imgUrl: imgUrl, size: size, className: b('avatar') }),
        (name || description) && (React.createElement("div", { className: b('info') },
            name && React.createElement("span", { className: b('name') }, name),
            !compact && description && (React.createElement("span", { className: b('description') }, description))))));
}
