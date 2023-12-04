import React from 'react';
import { useRadio } from '../../hooks/private';
import { ControlLabel } from '../ControlLabel';
import { block } from '../utils/cn';
import './Radio.css';
const b = block('radio');
export const Radio = React.forwardRef(function Radio(props, ref) {
    const { size = 'm', disabled = false, content, children, title, style, className, qa } = props;
    const { checked, inputProps } = useRadio(props);
    const text = content || children;
    const control = (React.createElement("span", { className: b('indicator') },
        React.createElement("span", { className: b('disc') }),
        React.createElement("input", Object.assign({}, inputProps, { className: b('control') })),
        React.createElement("span", { className: b('outline') })));
    return (React.createElement(ControlLabel, { ref: ref, title: title, style: style, size: size, disabled: disabled, className: b({
            size,
            disabled,
            checked,
        }, className), qa: qa, control: control }, text));
});
