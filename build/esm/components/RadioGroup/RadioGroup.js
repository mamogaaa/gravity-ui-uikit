import React from 'react';
import { useRadioGroup } from '../../hooks/private';
import { Radio } from '../Radio';
import { block } from '../utils/cn';
import './RadioGroup.css';
const b = block('radio-group');
export const RadioGroup = React.forwardRef(function RadioGroup(props, ref) {
    const { size = 'm', direction = 'horizontal', style, className, optionClassName, qa, children, } = props;
    let options = props.options;
    if (!options) {
        options = React.Children.toArray(children).map(({ props }) => ({
            value: props.value,
            content: props.content || props.children,
            disabled: props.disabled,
        }));
    }
    const { containerProps, optionsProps } = useRadioGroup(Object.assign(Object.assign({}, props), { options }));
    return (React.createElement("div", Object.assign({}, containerProps, { ref: ref, style: style, className: b({ size, direction }, className), "data-qa": qa }), optionsProps.map((optionProps) => (React.createElement(Radio, Object.assign({}, optionProps, { key: optionProps.value, className: b('option', optionClassName), size: size }))))));
});
RadioGroup.Option = Radio;
