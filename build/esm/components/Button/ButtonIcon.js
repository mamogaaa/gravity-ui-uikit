import React from 'react';
import { block } from '../utils/cn';
const b = block('button');
export const ButtonIcon = ({ side, className, children }) => {
    return (React.createElement("span", { className: b('icon', {
            side,
        }, className) },
        React.createElement("span", { className: b('icon-inner') }, children)));
};
ButtonIcon.displayName = 'Button.Icon';
