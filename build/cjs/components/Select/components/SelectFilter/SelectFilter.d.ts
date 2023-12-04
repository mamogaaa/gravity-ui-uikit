import React from 'react';
import type { SelectProps } from '../../types';
import type { SelectFilterRef } from '../../types-misc';
type SelectFilterProps = {
    onChange: (filter: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    renderFilter?: SelectProps['renderFilter'];
    size: NonNullable<SelectProps['size']>;
    value: string;
    placeholder?: string;
};
export declare const SelectFilter: React.ForwardRefExoticComponent<SelectFilterProps & React.RefAttributes<SelectFilterRef>>;
export {};
