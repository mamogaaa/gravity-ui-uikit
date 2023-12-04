import React from 'react';
import type { ControlGroupOption, ControlGroupProps, DOMProps, QAProps } from '../types';
export type RadioButtonOption = ControlGroupOption;
export type RadioButtonSize = 's' | 'm' | 'l' | 'xl';
export type RadioButtonWidth = 'auto' | 'max';
export interface RadioButtonProps extends ControlGroupProps, DOMProps, QAProps {
    size?: RadioButtonSize;
    width?: RadioButtonWidth;
    children?: React.ReactElement<ControlGroupOption> | React.ReactElement<ControlGroupOption>[];
}
interface RadioButtonComponent extends React.ForwardRefExoticComponent<RadioButtonProps & React.RefAttributes<HTMLDivElement>> {
    Option: React.ComponentType<ControlGroupOption>;
}
export declare const RadioButton: RadioButtonComponent;
export {};
