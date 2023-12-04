"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputControl = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../utils/cn");
const b = (0, cn_1.block)('text-input');
function TextInputControl(props) {
    const { controlProps, controlRef, type, name, id, tabIndex, autoComplete, placeholder, value, defaultValue, autoFocus, disabled, onChange, onFocus, onBlur, onKeyDown, onKeyUp, onKeyPress, } = props;
    return (react_1.default.createElement("input", Object.assign({}, controlProps, { ref: controlRef, className: b('control', { type: 'input' }, controlProps === null || controlProps === void 0 ? void 0 : controlProps.className), type: type, name: name, id: id, tabIndex: tabIndex, placeholder: placeholder, value: value, defaultValue: defaultValue, autoFocus: autoFocus, autoComplete: autoComplete, onChange: onChange, onFocus: onFocus, onBlur: onBlur, onKeyDown: onKeyDown, onKeyUp: onKeyUp, onKeyPress: onKeyPress, disabled: disabled })));
}
exports.TextInputControl = TextInputControl;
