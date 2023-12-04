import React from 'react';
import { ChevronDown } from '@gravity-ui/icons';
import { Icon } from '../Icon';
import { block } from '../utils/cn';
import './ArrowToggle.css';
const b = block('arrow-toggle');
export function ArrowToggle({ size = 16, direction = 'bottom', className }) {
    return (React.createElement("span", { style: { width: size, height: size }, className: b({ direction }, className) },
        React.createElement(Icon, { data: ChevronDown, size: size })));
}
