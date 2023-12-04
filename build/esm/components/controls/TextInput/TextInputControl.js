import React from 'react';
import { block } from '../../utils/cn';
const b = block('text-input');
export function TextInputControl(props) {
    const { controlProps, controlRef, type, name, id, tabIndex, autoComplete, placeholder, value, defaultValue, autoFocus, disabled, onChange, onFocus, onBlur, onKeyDown, onKeyUp, onKeyPress, } = props;
    return (React.createElement("input", Object.assign({}, controlProps, { ref: controlRef, className: b('control', { type: 'input' }, controlProps === null || controlProps === void 0 ? void 0 : controlProps.className), type: type, name: name, id: id, tabIndex: tabIndex, placeholder: placeholder, value: value, defaultValue: defaultValue, autoFocus: autoFocus, autoComplete: autoComplete, onChange: onChange, onFocus: onFocus, onBlur: onBlur, onKeyDown: onKeyDown, onKeyUp: onKeyUp, onKeyPress: onKeyPress, disabled: disabled })));
}
