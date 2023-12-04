import React from 'react';
import { useUniqId } from '../../hooks';
import { block } from '../utils/cn';
const b = block('menu');
export const MenuGroup = React.forwardRef(function MenuGroup({ label, children, style, className, qa }, ref) {
    const labelId = useUniqId();
    return (React.createElement("li", { ref: ref, className: b('list-group-item') },
        React.createElement("div", { style: style, className: b('group', className), "data-qa": qa },
            label && (React.createElement("div", { id: labelId, className: b('group-label') }, label)),
            React.createElement("ul", { role: "group", "aria-labelledby": labelId, className: b('group-list') }, children))));
});
