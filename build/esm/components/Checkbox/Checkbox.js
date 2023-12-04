import React from 'react';
import { useCheckbox } from '../../hooks/private';
import { ControlLabel } from '../ControlLabel';
import { block } from '../utils/cn';
import { CheckboxDashIcon } from './CheckboxDashIcon';
import { CheckboxTickIcon } from './CheckboxTickIcon';
import './Checkbox.css';
const b = block('checkbox');
export const Checkbox = React.forwardRef(function Checkbox(props, ref) {
    const { size = 'm', indeterminate, disabled = false, content, children, title, style, className, qa, } = props;
    const { checked, inputProps } = useCheckbox(props);
    const text = content || children;
    const control = (React.createElement("span", { className: b('indicator') },
        React.createElement("span", { className: b('icon'), "aria-hidden": true }, indeterminate ? (React.createElement(CheckboxDashIcon, { className: b('icon-svg', { type: 'dash' }) })) : (React.createElement(CheckboxTickIcon, { className: b('icon-svg', { type: 'tick' }) }))),
        React.createElement("input", Object.assign({}, inputProps, { className: b('control') })),
        React.createElement("span", { className: b('outline') })));
    return (React.createElement(ControlLabel, { ref: ref, title: title, style: style, size: size, disabled: disabled, className: b({
            size,
            disabled,
            indeterminate,
            checked,
        }, className), qa: qa, control: control }, text));
});
