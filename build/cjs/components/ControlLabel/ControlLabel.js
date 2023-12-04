"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlLabel = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('control-label');
/**
 * Wrap with label for `<Checkbox/>`, `<Radio/>`, `<Switch/>`
 */
exports.ControlLabel = react_1.default.forwardRef(({ children, className, labelClassName, title, style, disabled = false, control, size = 'm', qa, }, ref) => {
    const clonedControl = react_1.default.cloneElement(control, {
        className: b('indicator', control.props.className),
    });
    return (react_1.default.createElement("label", { ref: ref, title: title, style: style, className: b({ size, disabled }, className), "data-qa": qa },
        clonedControl,
        children ? react_1.default.createElement("span", { className: b('text', labelClassName) }, children) : null));
});
exports.ControlLabel.displayName = 'ControlLabel';
