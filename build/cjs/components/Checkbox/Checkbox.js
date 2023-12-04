"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const private_1 = require("../../hooks/private");
const ControlLabel_1 = require("../ControlLabel");
const cn_1 = require("../utils/cn");
const CheckboxDashIcon_1 = require("./CheckboxDashIcon");
const CheckboxTickIcon_1 = require("./CheckboxTickIcon");
const b = (0, cn_1.block)('checkbox');
exports.Checkbox = react_1.default.forwardRef(function Checkbox(props, ref) {
    const { size = 'm', indeterminate, disabled = false, content, children, title, style, className, qa, } = props;
    const { checked, inputProps } = (0, private_1.useCheckbox)(props);
    const text = content || children;
    const control = (react_1.default.createElement("span", { className: b('indicator') },
        react_1.default.createElement("span", { className: b('icon'), "aria-hidden": true }, indeterminate ? (react_1.default.createElement(CheckboxDashIcon_1.CheckboxDashIcon, { className: b('icon-svg', { type: 'dash' }) })) : (react_1.default.createElement(CheckboxTickIcon_1.CheckboxTickIcon, { className: b('icon-svg', { type: 'tick' }) }))),
        react_1.default.createElement("input", Object.assign({}, inputProps, { className: b('control') })),
        react_1.default.createElement("span", { className: b('outline') })));
    return (react_1.default.createElement(ControlLabel_1.ControlLabel, { ref: ref, title: title, style: style, size: size, disabled: disabled, className: b({
            size,
            disabled,
            indeterminate,
            checked,
        }, className), qa: qa, control: control }, text));
});
