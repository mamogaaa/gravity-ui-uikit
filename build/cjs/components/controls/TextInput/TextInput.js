"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const hooks_1 = require("../../../hooks");
const private_1 = require("../../../hooks/private");
const Icon_1 = require("../../Icon");
const Popover_1 = require("../../Popover");
const cn_1 = require("../../utils/cn");
const common_1 = require("../common");
const OuterAdditionalContent_1 = require("../common/OuterAdditionalContent/OuterAdditionalContent");
const utils_1 = require("../utils");
const AdditionalContent_1 = require("./AdditionalContent");
const TextInputControl_1 = require("./TextInputControl");
const b = (0, cn_1.block)('text-input');
// eslint-disable-next-line complexity
exports.TextInput = react_1.default.forwardRef(function TextInput(props, ref) {
    const { view = 'normal', size = 'm', pin = 'round-round', name, value, defaultValue, label, disabled = false, hasClear = false, error, errorMessage: errorMessageProp, errorPlacement: errorPlacementProp = 'outside', validationState: validationStateProp, autoComplete, id: originalId, tabIndex, style, className, qa, controlProps: originalControlProps, leftContent, rightContent, note, onUpdate, onChange, } = props;
    const { errorMessage, errorPlacement, validationState } = (0, utils_1.errorPropsMapper)({
        error,
        errorMessage: errorMessageProp,
        errorPlacement: errorPlacementProp,
        validationState: validationStateProp,
    });
    const [uncontrolledValue, setUncontrolledValue] = react_1.default.useState(defaultValue !== null && defaultValue !== void 0 ? defaultValue : '');
    const innerControlRef = react_1.default.useRef(null);
    const handleRef = (0, hooks_1.useForkRef)(props.controlRef, innerControlRef);
    const labelRef = react_1.default.useRef(null);
    const leftContentRef = react_1.default.useRef(null);
    const state = (0, utils_1.getInputControlState)(validationState);
    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : uncontrolledValue;
    const isLabelVisible = Boolean(label);
    const isErrorMsgVisible = validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'outside';
    const isErrorIconVisible = validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'inside';
    const isClearControlVisible = Boolean(hasClear && !disabled && inputValue);
    const isLeftContentVisible = Boolean(leftContent);
    const isRightContentVisible = Boolean(rightContent);
    const isAutoCompleteOff = isLabelVisible && !originalId && !name && typeof autoComplete === 'undefined';
    const innerId = (0, hooks_1.useUniqId)();
    const id = isLabelVisible ? originalId || innerId : originalId;
    const labelSize = (0, private_1.useElementSize)(isLabelVisible ? labelRef : null, size);
    const leftContentSize = (0, private_1.useElementSize)(isLeftContentVisible ? leftContentRef : null, size);
    const errorMessageId = (0, hooks_1.useUniqId)();
    const noteId = (0, hooks_1.useUniqId)();
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
        autoComplete: isAutoCompleteOff ? 'off' : (0, utils_1.prepareAutoComplete)(autoComplete),
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
    return (react_1.default.createElement("span", { ref: ref, style: style, className: b({
            view,
            size,
            disabled,
            state,
            pin: view === 'clear' ? undefined : pin,
            'has-clear': isClearControlVisible,
            'has-left-content': isLeftContentVisible,
            'has-right-content': isClearControlVisible || isRightContentVisible,
        }, className), "data-qa": qa },
        react_1.default.createElement("span", { className: b('content') },
            isLeftContentVisible && (react_1.default.createElement(AdditionalContent_1.AdditionalContent, { ref: leftContentRef, placement: "left", onClick: handleAdditionalContentClick }, leftContent)),
            isLabelVisible && (react_1.default.createElement("label", { ref: labelRef, style: {
                    left: isLeftContentVisible ? leftContentSize.width : undefined,
                    maxWidth: `calc(50% - ${leftContentSize.width}px)`,
                }, className: b('label'), title: label, htmlFor: id }, `${label}`)),
            react_1.default.createElement(TextInputControl_1.TextInputControl, Object.assign({}, props, commonProps, { controlRef: handleRef })),
            isClearControlVisible && (react_1.default.createElement(common_1.ClearButton, { size: (0, common_1.mapTextInputSizeToButtonSize)(size), onClick: handleClear, className: b('clear') })),
            isRightContentVisible && (react_1.default.createElement(AdditionalContent_1.AdditionalContent, { placement: "right", onClick: handleAdditionalContentClick }, rightContent)),
            isErrorIconVisible && (react_1.default.createElement(Popover_1.Popover, { content: errorMessage },
                react_1.default.createElement("span", { "data-qa": utils_1.CONTROL_ERROR_ICON_QA },
                    react_1.default.createElement(Icon_1.Icon, { data: icons_1.TriangleExclamation, className: b('error-icon'), size: size === 's' ? 12 : 16 }))))),
        react_1.default.createElement(OuterAdditionalContent_1.OuterAdditionalContent, { note: note, errorMessage: isErrorMsgVisible ? errorMessage : null, noteId: noteId, errorMessageId: errorMessageId })));
});
