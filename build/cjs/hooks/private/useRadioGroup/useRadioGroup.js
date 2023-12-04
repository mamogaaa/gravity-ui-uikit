"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRadioGroup = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const __1 = require("../..");
function useRadioGroup(props) {
    var _a, _b;
    const { name, value, defaultValue, options = [], disabled, onUpdate, onChange, onFocus, onBlur, } = props;
    const controlId = (0, __1.useUniqId)();
    const [valueState, setValueState] = react_1.default.useState(defaultValue !== null && defaultValue !== void 0 ? defaultValue : (_b = (_a = options[0]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.toString());
    const isControlled = typeof value === 'string';
    const currentValue = isControlled ? value : valueState;
    const handleChange = react_1.default.useCallback((event) => {
        if (!isControlled) {
            setValueState(event.target.value);
        }
        if (onChange) {
            onChange(event);
        }
        if (onUpdate) {
            onUpdate(event.target.value);
        }
    }, [isControlled, onUpdate, onChange]);
    const containerProps = {
        role: 'radiogroup',
        'aria-disabled': disabled,
        'aria-label': props['aria-label'],
        'aria-labelledby': props['aria-labelledby'],
    };
    const optionsProps = options.map((option) => ({
        name: name || controlId,
        value: String(option.value),
        content: option.content,
        checked: currentValue === String(option.value),
        disabled: disabled || option.disabled,
        onChange: handleChange,
        onFocus: onFocus,
        onBlur: onBlur,
    }));
    return { containerProps, optionsProps };
}
exports.useRadioGroup = useRadioGroup;
