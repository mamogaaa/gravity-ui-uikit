import React from 'react';
import { block } from '../utils/cn';
import { MenuGroup } from './MenuGroup';
import { MenuItem } from './MenuItem';
import './Menu.css';
const b = block('menu');
// TODO: keyboard navigation, Up/Down arrows and Enter
export const Menu = React.forwardRef(function Menu({ size = 'm', children, style, className, qa }, ref) {
    return (React.createElement("ul", { ref: ref, role: "menu", 
        // tabIndex={0}
        style: style, className: b({ size }, className), "data-qa": qa }, children));
});
Menu.Item = MenuItem;
Menu.Group = MenuGroup;
