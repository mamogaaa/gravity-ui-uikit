import React from 'react';
import { useRadio } from '../../hooks/private';
import { block } from '../utils/cn';
import { isIcon } from '../utils/common';
const b = block('radio-button');
export const RadioButtonOption = React.forwardRef(function RadioButtonOption(props, ref) {
    const { disabled = false, content, children } = props;
    const { checked, inputProps } = useRadio(props);
    const inner = content || children;
    const icon = isIcon(inner);
    return (React.createElement("label", { className: b('option', {
            disabled,
            checked,
        }), ref: ref },
        React.createElement("input", Object.assign({}, inputProps, { className: b('option-control') })),
        React.createElement("span", { className: b('option-outline') }),
        inner && React.createElement("span", { className: b('option-text', { icon }) }, inner)));
});
