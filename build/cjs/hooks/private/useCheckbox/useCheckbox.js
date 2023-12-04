"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCheckbox = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const __1 = require("../..");
const event_broker_1 = require("../../../components/utils/event-broker");
function useCheckbox({ name, value, id, defaultChecked, checked, indeterminate, onUpdate, onChange, controlRef, controlProps, onFocus, onBlur, disabled, }) {
    const innerControlRef = react_1.default.useRef(null);
    const [checkedState, setCheckedState] = react_1.default.useState(defaultChecked !== null && defaultChecked !== void 0 ? defaultChecked : false);
    const isControlled = typeof checked === 'boolean';
    const isChecked = isControlled ? checked : checkedState;
    const inputChecked = indeterminate ? false : checked;
    const inputAriaChecked = indeterminate ? 'mixed' : isChecked;
    const handleRef = (0, __1.useForkRef)(controlRef, innerControlRef);
    react_1.default.useLayoutEffect(() => {
        if (innerControlRef.current) {
            innerControlRef.current.indeterminate = Boolean(indeterminate);
        }
    }, [indeterminate]);
    const handleChange = (event) => {
        if (!isControlled) {
            setCheckedState(event.target.checked);
        }
        if (onChange) {
            onChange(event);
        }
        if (onUpdate) {
            onUpdate(event.target.checked);
        }
    };
    const handleClickCapture = react_1.default.useCallback((event) => {
        event_broker_1.eventBroker.publish({
            componentId: 'Checkbox',
            eventId: 'click',
            domEvent: event,
            meta: {
                checked: event.target.checked,
            },
        });
    }, []);
    const inputProps = Object.assign(Object.assign({}, controlProps), { name,
        value,
        id,
        onFocus,
        onBlur,
        disabled, type: 'checkbox', onChange: handleChange, onClickCapture: handleClickCapture, defaultChecked: defaultChecked, checked: inputChecked, 'aria-checked': inputAriaChecked, ref: handleRef });
    return { checked: isChecked, inputProps };
}
exports.useCheckbox = useCheckbox;
