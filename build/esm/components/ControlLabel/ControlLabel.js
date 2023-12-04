import React from 'react';
import { block } from '../utils/cn';
import './ControlLabel.css';
const b = block('control-label');
/**
 * Wrap with label for `<Checkbox/>`, `<Radio/>`, `<Switch/>`
 */
export const ControlLabel = React.forwardRef(({ children, className, labelClassName, title, style, disabled = false, control, size = 'm', qa, }, ref) => {
    const clonedControl = React.cloneElement(control, {
        className: b('indicator', control.props.className),
    });
    return (React.createElement("label", { ref: ref, title: title, style: style, className: b({ size, disabled }, className), "data-qa": qa },
        clonedControl,
        children ? React.createElement("span", { className: b('text', labelClassName) }, children) : null));
});
ControlLabel.displayName = 'ControlLabel';
