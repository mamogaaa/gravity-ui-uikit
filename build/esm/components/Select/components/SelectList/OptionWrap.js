import React from 'react';
import { Check } from '@gravity-ui/icons';
import { Icon } from '../../../Icon';
import { blockNew as block } from '../../../utils/cn';
const b = block('select-list');
const DefaultOption = ({ option }) => {
    const { content, children, disabled } = option;
    return React.createElement("span", { className: b('option-default-label', { disabled }) }, content || children);
};
export const OptionWrap = (props) => {
    const { renderOption, value, option, multiple } = props;
    const selected = value.indexOf(option.value) !== -1;
    const optionContent = renderOption ? renderOption(option) : React.createElement(DefaultOption, { option: option });
    return (React.createElement("div", { "data-qa": option.qa, className: b('option', { colored: selected && !multiple, disabled: option.disabled }) },
        multiple && (React.createElement(Icon, { className: b('tick-icon', { shown: selected && multiple }), data: Check })),
        optionContent));
};
