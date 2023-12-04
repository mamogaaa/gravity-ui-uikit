import React from 'react';
import { TriangleExclamation } from '@gravity-ui/icons';
import { useForkRef, useUniqId } from '../../../hooks';
import { useElementSize } from '../../../hooks/private';
import { Icon } from '../../Icon';
import { Popover } from '../../Popover';
import { block } from '../../utils/cn';
import { ClearButton, mapTextInputSizeToButtonSize } from '../common';
import { OuterAdditionalContent } from '../common/OuterAdditionalContent/OuterAdditionalContent';
import { CONTROL_ERROR_ICON_QA, errorPropsMapper, getInputControlState, prepareAutoComplete, } from '../utils';
import { AdditionalContent } from './AdditionalContent';
import { TextInputControl } from './TextInputControl';
import './TextInput.css';
const b = block('text-input');
// eslint-disable-next-line complexity
export const TextInput = React.forwardRef(function TextInput(props, ref) {
    const { view = 'normal', size = 'm', pin = 'round-round', name, value, defaultValue, label, disabled = false, hasClear = false, error, errorMessage: errorMessageProp, errorPlacement: errorPlacementProp = 'outside', validationState: validationStateProp, autoComplete, id: originalId, tabIndex, style, className, qa, controlProps: originalControlProps, leftContent, rightContent, note, onUpdate, onChange, } = props;
    const { errorMessage, errorPlacement, validationState } = errorPropsMapper({
        error,
        errorMessage: errorMessageProp,
        errorPlacement: errorPlacementProp,
        validationState: validationStateProp,
    });
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue !== null && defaultValue !== void 0 ? defaultValue : '');
    const innerControlRef = React.useRef(null);
    const handleRef = useForkRef(props.controlRef, innerControlRef);
    const labelRef = React.useRef(null);
    const leftContentRef = React.useRef(null);
    const state = getInputControlState(validationState);
    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : uncontrolledValue;
    const isLabelVisible = Boolean(label);
    const isErrorMsgVisible = validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'outside';
    const isErrorIconVisible = validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'inside';
    const isClearControlVisible = Boolean(hasClear && !disabled && inputValue);
    const isLeftContentVisible = Boolean(leftContent);
    const isRightContentVisible = Boolean(rightContent);
    const isAutoCompleteOff = isLabelVisible && !originalId && !name && typeof autoComplete === 'undefined';
    const innerId = useUniqId();
    const id = isLabelVisible ? originalId || innerId : originalId;
    const labelSize = useElementSize(isLabelVisible ? labelRef : null, size);
    const leftContentSize = useElementSize(isLeftContentVisible ? leftContentRef : null, size);
    const errorMessageId = useUniqId();
    const noteId = useUniqId();
    const ariaDescribedBy = [
        originalControlProps === null || originalControlProps === void 0 ? void 0 : originalControlProps['aria-describedby'],
        note ? noteId : undefined,
        isErrorMsgVisible ? errorMessageId : undefined,
    ]
        .filter(Boolean)
        .join(' ');
    const controlProps = Object.assign(Object.assign({}, originalControlProps), { style: Object.assign(Object.assign({}, originalControlProps === null || originalControlProps === void 0 ? void 0 : originalControlProps.style), (isLabelVisible && labelSize.width ? { paddingLeft: `${labelSize.width}px` } : {})), 'aria-invalid': validationState === 'invalid' || undefined, 'aria-describedby': ariaDescribedBy || undefined });
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
        autoComplete: isAutoCompleteOff ? 'off' : prepareAutoComplete(autoComplete),
        controlProps,
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
    const handleAdditionalContentClick = (event) => {
        var _a, _b;
        const hasActiveElement = event.currentTarget.contains(document.activeElement);
        const hasSelection = Boolean((_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.toString());
        if (!hasActiveElement && !hasSelection) {
            (_b = innerControlRef.current) === null || _b === void 0 ? void 0 : _b.focus();
        }
    };
    return (React.createElement("span", { ref: ref, style: style, className: b({
            view,
            size,
            disabled,
            state,
            pin: view === 'clear' ? undefined : pin,
            'has-clear': isClearControlVisible,
            'has-left-content': isLeftContentVisible,
            'has-right-content': isClearControlVisible || isRightContentVisible,
        }, className), "data-qa": qa },
        React.createElement("span", { className: b('content') },
            isLeftContentVisible && (React.createElement(AdditionalContent, { ref: leftContentRef, placement: "left", onClick: handleAdditionalContentClick }, leftContent)),
            isLabelVisible && (React.createElement("label", { ref: labelRef, style: {
                    left: isLeftContentVisible ? leftContentSize.width : undefined,
                    maxWidth: `calc(50% - ${leftContentSize.width}px)`,
                }, className: b('label'), title: label, htmlFor: id }, `${label}`)),
            React.createElement(TextInputControl, Object.assign({}, props, commonProps, { controlRef: handleRef })),
            isClearControlVisible && (React.createElement(ClearButton, { size: mapTextInputSizeToButtonSize(size), onClick: handleClear, className: b('clear') })),
            isRightContentVisible && (React.createElement(AdditionalContent, { placement: "right", onClick: handleAdditionalContentClick }, rightContent)),
            isErrorIconVisible && (React.createElement(Popover, { content: errorMessage },
                React.createElement("span", { "data-qa": CONTROL_ERROR_ICON_QA },
                    React.createElement(Icon, { data: TriangleExclamation, className: b('error-icon'), size: size === 's' ? 12 : 16 }))))),
        React.createElement(OuterAdditionalContent, { note: note, errorMessage: isErrorMsgVisible ? errorMessage : null, noteId: noteId, errorMessageId: errorMessageId })));
});
