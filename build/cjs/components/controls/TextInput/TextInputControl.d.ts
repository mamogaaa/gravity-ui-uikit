import React from 'react';
import type { TextInputProps } from './TextInput';
type Props = Omit<TextInputProps, 'autoComplete'> & {
    autoComplete?: React.TextareaHTMLAttributes<HTMLInputElement>['autoComplete'];
};
export declare function TextInputControl(props: Props): React.JSX.Element;
export {};
