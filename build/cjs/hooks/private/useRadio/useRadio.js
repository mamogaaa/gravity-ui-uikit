"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRadio = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const __1 = require("../..");
const event_broker_1 = require("../../../components/utils/event-broker");
function useRadio({ name, value, checked, defaultChecked, disabled, controlRef, controlProps, onUpdate, onChange, onFocus, onBlur, id, }) {
    const controlId = (0, __1.useUniqId)();
    const innerControlRef = react_1.default.useRef(null);
    const [checkedState, setCheckedState] = react_1.default.useState(defaultChecked !== null && defaultChecked !== void 0 ? defaultChecked : false);
    const isControlled = typeof checked === 'boolean';
    const isChecked = isControlled ? checked : checkedState;
    const handleRef = (0, __1.useForkRef)(controlRef, innerControlRef);
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
    const onChangeCapture = (event) => {
        event_broker_1.eventBroker.publish({
            componentId: 'Radio',
            eventId: 'click',
            domEvent: event,
        });
    };
    const inputProps = Object.assign(Object.assign({}, controlProps), { name: name || controlId, value,
        id,
        onFocus,
        onBlur,
        disabled, type: 'radio', onChange: handleChange, onChangeCapture: onChangeCapture, checked, defaultChecked: defaultChecked, 'aria-checked': isChecked, ref: handleRef });
    return { checked: isChecked, inputProps };
}
exports.useRadio = useRadio;
