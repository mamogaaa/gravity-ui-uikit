import React from 'react';
import { TextInput } from '../../../controls';
import { blockNew as block } from '../../../utils/cn';
import './SelectFilter.css';
const b = block('select-filter');
const style = {
    padding: '4px 4px 0',
};
export const SelectFilter = React.forwardRef((props, ref) => {
    const { onChange, onKeyDown, renderFilter, size, value, placeholder } = props;
    const inputRef = React.useRef(null);
    React.useImperativeHandle(ref, () => ({
        focus: () => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true }); },
    }), []);
    return renderFilter ? (renderFilter({ onChange, onKeyDown, value, ref: inputRef, style })) : (React.createElement("div", { className: b(), style: style },
        React.createElement(TextInput, { controlRef: inputRef, controlProps: { className: b('input'), size: 1 }, size: size, value: value, placeholder: placeholder, onUpdate: onChange, onKeyDown: onKeyDown })));
});
SelectFilter.displayName = 'SelectFilter';
