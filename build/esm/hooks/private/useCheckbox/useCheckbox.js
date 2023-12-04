import React from 'react';
import { useForkRef } from '../..';
import { eventBroker } from '../../../components/utils/event-broker';
export function useCheckbox({ name, value, id, defaultChecked, checked, indeterminate, onUpdate, onChange, controlRef, controlProps, onFocus, onBlur, disabled, }) {
    const innerControlRef = React.useRef(null);
    const [checkedState, setCheckedState] = React.useState(defaultChecked !== null && defaultChecked !== void 0 ? defaultChecked : false);
    const isControlled = typeof checked === 'boolean';
    const isChecked = isControlled ? checked : checkedState;
    const inputChecked = indeterminate ? false : checked;
    const inputAriaChecked = indeterminate ? 'mixed' : isChecked;
    const handleRef = useForkRef(controlRef, innerControlRef);
    React.useLayoutEffect(() => {
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
    const handleClickCapture = React.useCallback((event) => {
        eventBroker.publish({
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
