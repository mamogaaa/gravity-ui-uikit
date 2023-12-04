import React from 'react';
import { useForkRef, useUniqId } from '../../../hooks';
import { blockNew } from '../../utils/cn';
import { ClearButton, mapTextInputSizeToButtonSize } from '../common';
import { OuterAdditionalContent } from '../common/OuterAdditionalContent/OuterAdditionalContent';
import { errorPropsMapper, getInputControlState, prepareAutoComplete } from '../utils';
import { TextAreaControl } from './TextAreaControl';
import './TextArea.css';
const b = blockNew('text-area');
// eslint-disable-next-line complexity
export const TextArea = React.forwardRef(function TextArea(props, ref) {
    const { view = 'normal', size = 'm', pin = 'round-round', name, value, defaultValue, disabled = false, hasClear = false, error, errorMessage: errorMessageProp, validationState: validationStateProp, autoComplete, id: originalId, tabIndex, style, className, qa, controlProps, note, onUpdate, onChange, } = props;
    const { errorMessage, validationState } = errorPropsMapper({
        error,
        errorMessage: errorMessageProp,
        validationState: validationStateProp,
    });
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue !== null && defaultValue !== void 0 ? defaultValue : '');
    const innerControlRef = React.useRef(null);
    const [hasVerticalScrollbar, setHasVerticalScrollbar] = React.useState(false);
    const state = getInputControlState(validationState);
    const handleRef = useForkRef(props.controlRef, innerControlRef);
    const innerId = useUniqId();
    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : uncontrolledValue;
    const isErrorMsgVisible = validationState === 'invalid' && Boolean(errorMessage);
    const isClearControlVisible = Boolean(hasClear && !disabled && inputValue);
    const id = originalId || innerId;
    const errorMessageId = useUniqId();
    const noteId = useUniqId();
    const ariaDescribedBy = [
        controlProps === null || controlProps === void 0 ? void 0 : controlProps['aria-describedby'],
        note ? noteId : undefined,
        isErrorMsgVisible ? errorMessageId : undefined,
    ]
        .filter(Boolean)
        .join(' ');
    const commonProps = {
        id,
        tabIndex,
        name,
        onChange(event) {
            const newValue = event.target.value;
            if (!isControlled) {
                setUncontrolledValue(newValue);
            }
            if (onChange) {
                onChange(event);
            }
            if (onUpdate) {
                onUpdate(newValue);
            }
        },
        autoComplete: prepareAutoComplete(autoComplete),
        controlProps: Object.assign(Object.assign({}, controlProps), { 'aria-describedby': ariaDescribedBy || undefined, 'aria-invalid': validationState === 'invalid' || undefined }),
    };
    const handleClear = (event) => {
        const control = innerControlRef.current;
        if (control) {
            control.focus();
            const syntheticEvent = Object.create(event);
            syntheticEvent.target = control;
            syntheticEvent.currentTarget = control;
            control.value = '';
            if (onChange) {
                onChange(syntheticEvent);
            }
            if (onUpdate) {
                onUpdate('');
            }
        }
        if (!isControlled) {
            setUncontrolledValue('');
        }
    };
    React.useEffect(() => {
        const control = innerControlRef.current;
        if (control) {
            const currHasVerticalScrollbar = control.scrollHeight > control.clientHeight;
            if (hasVerticalScrollbar !== currHasVerticalScrollbar) {
                setHasVerticalScrollbar(currHasVerticalScrollbar);
            }
        }
    }, [inputValue, hasVerticalScrollbar]);
    return (React.createElement("span", { ref: ref, style: style, className: b({
            view,
            size,
            disabled,
            state,
            pin: view === 'clear' ? undefined : pin,
            'has-clear': isClearControlVisible,
            'has-scrollbar': hasVerticalScrollbar,
        }, className), "data-qa": qa },
        React.createElement("span", { className: b('content') },
            React.createElement(TextAreaControl, Object.assign({}, props, commonProps, { controlRef: handleRef })),
            isClearControlVisible && (React.createElement(ClearButton, { className: b('clear', { size }), size: mapTextInputSizeToButtonSize(size), onClick: handleClear }))),
        React.createElement(OuterAdditionalContent, { errorMessage: isErrorMsgVisible ? errorMessage : null, errorMessageId: errorMessageId, note: note, noteId: noteId })));
});
