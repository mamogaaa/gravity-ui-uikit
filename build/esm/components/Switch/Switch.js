import React from 'react';
import { useCheckbox } from '../../hooks/private';
import { ControlLabel } from '../ControlLabel';
import { block } from '../utils/cn';
import './Switch.css';
const b = block('switch');
export const Switch = React.forwardRef(function Switch(props, ref) {
    const { size = 'm', disabled = false, content, children, title, style, className, qa } = props;
    const { checked, inputProps } = useCheckbox(props);
    const text = content || children;
    const control = (React.createElement("span", { className: b('indicator') },
        React.createElement("input", Object.assign({}, inputProps, { className: b('control') })),
        React.createElement("span", { className: b('outline') }),
        React.createElement("span", { className: b('slider') })));
    return (React.createElement(ControlLabel, { ref: ref, title: title, style: style, size: size, disabled: disabled, className: b({
            size,
            disabled,
            checked,
        }, className), labelClassName: b('text'), qa: qa, control: control }, text));
});
