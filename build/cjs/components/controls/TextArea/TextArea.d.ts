import React from 'react';
import type { BaseInputControlProps, InputControlPin, InputControlSize, InputControlView } from '../types';
export type TextAreaProps = BaseInputControlProps<HTMLTextAreaElement> & {
    /** The control's html attributes */
    controlProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    /** The number of visible text lines for the control. If not specified, the hight will be automatically calculated based on the content */
    rows?: number;
    /** The number of minimum visible text lines for the control. Ignored if `rows` is specified */
    minRows?: number;
    /** The number of maximum visible text lines for the control. Ignored if `rows` is specified */
    maxRows?: number;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
};
export type TextAreaPin = InputControlPin;
export type TextAreaSize = InputControlSize;
export type TextAreaView = InputControlView;
export declare const TextArea: React.ForwardRefExoticComponent<import("../..").DOMProps & import("../..").QAProps & {
    autoComplete?: string | boolean | undefined;
    autoFocus?: boolean | undefined;
    controlRef?: React.Ref<HTMLTextAreaElement> | undefined;
    defaultValue?: string | undefined;
    disabled?: boolean | undefined;
    error?: string | boolean | undefined;
    errorMessage?: React.ReactNode;
    errorPlacement?: "inside" | "outside" | undefined;
    validationState?: "invalid" | undefined;
    hasClear?: boolean | undefined;
    id?: string | undefined;
    name?: string | undefined;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement> | undefined;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement> | undefined;
    onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    onUpdate?: ((value: string) => void) | undefined;
    pin?: InputControlPin | undefined;
    placeholder?: string | undefined;
    size?: InputControlSize | undefined;
    tabIndex?: number | undefined;
    value?: string | undefined;
    view?: InputControlView | undefined;
} & {
    /** The control's html attributes */
    controlProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement> | undefined;
    /** The number of visible text lines for the control. If not specified, the hight will be automatically calculated based on the content */
    rows?: number | undefined;
    /** The number of minimum visible text lines for the control. Ignored if `rows` is specified */
    minRows?: number | undefined;
    /** The number of maximum visible text lines for the control. Ignored if `rows` is specified */
    maxRows?: number | undefined;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
} & React.RefAttributes<HTMLSpanElement>>;
