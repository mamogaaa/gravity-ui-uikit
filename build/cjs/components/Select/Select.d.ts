import React from 'react';
import { Option, OptionGroup } from './tech-components';
import type { SelectProps } from './types';
type SelectComponent = (<T = any>(p: SelectProps<T> & {
    ref?: React.Ref<HTMLButtonElement>;
}) => React.ReactElement) & {
    Option: typeof Option;
} & {
    OptionGroup: typeof OptionGroup;
};
export declare const Select: SelectComponent;
export {};
