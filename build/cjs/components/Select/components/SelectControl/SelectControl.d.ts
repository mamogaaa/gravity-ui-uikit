import React from 'react';
import type { SelectProps, SelectRenderControl, SelectRenderControlProps } from '../../types';
type ControlProps = {
    toggleOpen: () => void;
    renderControl?: SelectRenderControl;
    view: NonNullable<SelectProps['view']>;
    size: NonNullable<SelectProps['size']>;
    pin: NonNullable<SelectProps['pin']>;
    selectedOptionsContent: React.ReactNode;
    name?: string;
    className?: string;
    qa?: string;
    label?: string;
    placeholder?: SelectProps['placeholder'];
    error?: SelectProps['error'];
    disabled?: boolean;
    value: SelectProps['value'];
    clearValue: () => void;
    hasClear?: boolean;
} & Omit<SelectRenderControlProps, 'onClick' | 'onClear'>;
export declare const SelectControl: React.ForwardRefExoticComponent<Omit<ControlProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export {};
