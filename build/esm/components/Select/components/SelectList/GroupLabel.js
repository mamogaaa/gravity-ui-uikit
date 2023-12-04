import React from 'react';
import { blockNew as block } from '../../../utils/cn';
const b = block('select-list');
export const GroupLabel = ({ option, renderOptionGroup }) => {
    if (renderOptionGroup) {
        return React.createElement("div", { className: b('group-label-custom') }, renderOptionGroup(option));
    }
    else {
        return (React.createElement("div", { className: b('group-label', { empty: option.label === '' }) },
            React.createElement("div", { className: b('group-label-content') }, option.label)));
    }
};
