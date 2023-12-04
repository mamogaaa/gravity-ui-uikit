"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroup = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const private_1 = require("../../hooks/private");
const Radio_1 = require("../Radio");
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('radio-group');
exports.RadioGroup = react_1.default.forwardRef(function RadioGroup(props, ref) {
    const { size = 'm', direction = 'horizontal', style, className, optionClassName, qa, children, } = props;
    let options = props.options;
    if (!options) {
        options = react_1.default.Children.toArray(children).map(({ props }) => ({
            value: props.value,
            content: props.content || props.children,
            disabled: props.disabled,
        }));
    }
    const { containerProps, optionsProps } = (0, private_1.useRadioGroup)(Object.assign(Object.assign({}, props), { options }));
    return (react_1.default.createElement("div", Object.assign({}, containerProps, { ref: ref, style: style, className: b({ size, direction }, className), "data-qa": qa }), optionsProps.map((optionProps) => (react_1.default.createElement(Radio_1.Radio, Object.assign({}, optionProps, { key: optionProps.value, className: b('option', optionClassName), size: size }))))));
});
exports.RadioGroup.Option = Radio_1.Radio;
