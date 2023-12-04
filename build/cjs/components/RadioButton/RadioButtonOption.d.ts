import React from 'react';
import type { ControlProps } from '../types';
export interface RadioButtonOptionProps extends ControlProps {
    value: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
}
export declare const RadioButtonOption: React.ForwardRefExoticComponent<RadioButtonOptionProps & React.RefAttributes<HTMLLabelElement>>;
