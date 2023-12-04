"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioButton = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const private_1 = require("../../hooks/private");
const cn_1 = require("../utils/cn");
const RadioButtonOption_1 = require("./RadioButtonOption");
const b = (0, cn_1.block)('radio-button');
exports.RadioButton = react_1.default.forwardRef(function RadioButton(props, ref) {
    const { size = 'm', width, style, className, qa, children } = props;
    let options = props.options;
    if (!options) {
        options = react_1.default.Children.toArray(children).map(({ props }) => ({
            value: props.value,
            content: props.content || props.children,
            disabled: props.disabled,
        }));
    }
    const plateRef = react_1.default.useRef(null);
    const optionRef = react_1.default.useRef();
    const handleCheckedOptionMount = react_1.default.useCallback((checkedOptionNode) => {
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
    const handlePlateTransitionEnd = react_1.default.useCallback((event) => {
        event.currentTarget.hidden = true;
    }, []);
    const { containerProps, optionsProps } = (0, private_1.useRadioGroup)(Object.assign(Object.assign({}, props), { options }));
    return (react_1.default.createElement("div", Object.assign({}, containerProps, { ref: ref, style: style, className: b({ size, width }, className), "data-qa": qa }),
        react_1.default.createElement("div", { ref: plateRef, className: b('plate'), onTransitionEnd: handlePlateTransitionEnd, hidden: true }),
        optionsProps.map((optionProps) => (react_1.default.createElement(RadioButtonOption_1.RadioButtonOption, Object.assign({}, optionProps, { key: optionProps.value, ref: optionProps.checked ? handleCheckedOptionMount : undefined }))))));
});
exports.RadioButton.Option = RadioButtonOption_1.RadioButtonOption;
