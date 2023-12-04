"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionWrap = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../../../Icon");
const cn_1 = require("../../../utils/cn");
const b = (0, cn_1.blockNew)('select-list');
const DefaultOption = ({ option }) => {
    const { content, children, disabled } = option;
    return react_1.default.createElement("span", { className: b('option-default-label', { disabled }) }, content || children);
};
const OptionWrap = (props) => {
    const { renderOption, value, option, multiple } = props;
    const selected = value.indexOf(option.value) !== -1;
    const optionContent = renderOption ? renderOption(option) : react_1.default.createElement(DefaultOption, { option: option });
    return (react_1.default.createElement("div", { "data-qa": option.qa, className: b('option', { colored: selected && !multiple, disabled: option.disabled }) },
        multiple && (react_1.default.createElement(Icon_1.Icon, { className: b('tick-icon', { shown: selected && multiple }), data: icons_1.Check })),
        optionContent));
};
exports.OptionWrap = OptionWrap;
