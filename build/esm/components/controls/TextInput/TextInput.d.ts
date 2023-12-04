import React from 'react';
import type { BaseInputControlProps, InputControlPin, InputControlSize, InputControlView } from '../types';
import './TextInput.css';
export type TextInputProps = BaseInputControlProps<HTMLInputElement> & {
    /** The control's [type](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types) */
    type?: string;
    /** The control's html attributes */
    controlProps?: React.InputHTMLAttributes<HTMLInputElement>;
    /** Help text rendered to the left of the input node */
    label?: string;
    /** User`s node rendered before label and input node */
    leftContent?: React.ReactNode;
    /** User`s node rendered after input node and clear button */
    rightContent?: React.ReactNode;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
};
export type TextInputPin = InputControlPin;
export type TextInputSize = InputControlSize;
export type TextInputView = InputControlView;
export declare const TextInput: React.ForwardRefExoticComponent<import("../..").DOMProps & import("../..").QAProps & {
    autoComplete?: string | boolean | undefined;
    autoFocus?: boolean | undefined;
    controlRef?: React.Ref<HTMLInputElement> | undefined;
    defaultValue?: string | undefined;
    disabled?: boolean | undefined;
    error?: string | boolean | undefined;
    errorMessage?: React.ReactNode;
    errorPlacement?: "inside" | "outside" | undefined;
    validationState?: "invalid" | undefined;
    hasClear?: boolean | undefined;
    id?: string | undefined;
    name?: string | undefined;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    onKeyPress?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    onUpdate?: ((value: string) => void) | undefined;
    pin?: InputControlPin | undefined;
    placeholder?: string | undefined;
    size?: InputControlSize | undefined;
    tabIndex?: number | undefined;
    value?: string | undefined;
    view?: InputControlView | undefined;
} & {
    /** The control's [type](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types) */
    type?: string | undefined;
    /** The control's html attributes */
    controlProps?: React.InputHTMLAttributes<HTMLInputElement> | undefined;
    /** Help text rendered to the left of the input node */
    label?: string | undefined;
    /** User`s node rendered before label and input node */
    leftContent?: React.ReactNode;
    /** User`s node rendered after input node and clear button */
    rightContent?: React.ReactNode;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
} & React.RefAttributes<HTMLSpanElement>>;
