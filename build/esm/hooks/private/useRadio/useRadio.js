import React from 'react';
import { useForkRef, useUniqId } from '../..';
import { eventBroker } from '../../../components/utils/event-broker';
export function useRadio({ name, value, checked, defaultChecked, disabled, controlRef, controlProps, onUpdate, onChange, onFocus, onBlur, id, }) {
    const controlId = useUniqId();
    const innerControlRef = React.useRef(null);
    const [checkedState, setCheckedState] = React.useState(defaultChecked !== null && defaultChecked !== void 0 ? defaultChecked : false);
    const isControlled = typeof checked === 'boolean';
    const isChecked = isControlled ? checked : checkedState;
    const handleRef = useForkRef(controlRef, innerControlRef);
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
        eventBroker.publish({
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
