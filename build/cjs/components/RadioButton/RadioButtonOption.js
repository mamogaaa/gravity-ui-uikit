"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioButtonOption = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const private_1 = require("../../hooks/private");
const cn_1 = require("../utils/cn");
const common_1 = require("../utils/common");
const b = (0, cn_1.block)('radio-button');
exports.RadioButtonOption = react_1.default.forwardRef(function RadioButtonOption(props, ref) {
    const { disabled = false, content, children } = props;
    const { checked, inputProps } = (0, private_1.useRadio)(props);
    const inner = content || children;
    const icon = (0, common_1.isIcon)(inner);
    return (react_1.default.createElement("label", { className: b('option', {
            disabled,
            checked,
        }), ref: ref },
        react_1.default.createElement("input", Object.assign({}, inputProps, { className: b('option-control') })),
        react_1.default.createElement("span", { className: b('option-outline') }),
        inner && react_1.default.createElement("span", { className: b('option-text', { icon }) }, inner)));
});
