import React from 'react';
import { useRadioGroup } from '../../hooks/private';
import { block } from '../utils/cn';
import { RadioButtonOption as Option } from './RadioButtonOption';
import './RadioButton.css';
const b = block('radio-button');
export const RadioButton = React.forwardRef(function RadioButton(props, ref) {
    const { size = 'm', width, style, className, qa, children } = props;
    let options = props.options;
    if (!options) {
        options = React.Children.toArray(children).map(({ props }) => ({
            value: props.value,
            content: props.content || props.children,
            disabled: props.disabled,
        }));
    }
    const plateRef = React.useRef(null);
    const optionRef = React.useRef();
    const handleCheckedOptionMount = React.useCallback((checkedOptionNode) => {
        if (!checkedOptionNode) {
            return;
        }
        const plateNode = plateRef.current;
        if (!plateNode) {
            return;
        }
        const uncheckedOptionNode = optionRef.current;
        if (uncheckedOptionNode && uncheckedOptionNode !== checkedOptionNode) {
            const setPlateStyle = (node) => {
                plateNode.style.left = `${node.offsetLeft}px`;
                plateNode.style.width = `${node.offsetWidth}px`;
            };
            setPlateStyle(uncheckedOptionNode);
            plateNode.hidden = false;
            setPlateStyle(checkedOptionNode);
        }
        optionRef.current = checkedOptionNode;
    }, []);
    const handlePlateTransitionEnd = React.useCallback((event) => {
        event.currentTarget.hidden = true;
    }, []);
    const { containerProps, optionsProps } = useRadioGroup(Object.assign(Object.assign({}, props), { options }));
    return (React.createElement("div", Object.assign({}, containerProps, { ref: ref, style: style, className: b({ size, width }, className), "data-qa": qa }),
        React.createElement("div", { ref: plateRef, className: b('plate'), onTransitionEnd: handlePlateTransitionEnd, hidden: true }),
        optionsProps.map((optionProps) => (React.createElement(Option, Object.assign({}, optionProps, { key: optionProps.value, ref: optionProps.checked ? handleCheckedOptionMount : undefined }))))));
});
RadioButton.Option = Option;
