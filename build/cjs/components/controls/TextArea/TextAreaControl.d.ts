import React from 'react';
import type { TextAreaProps } from './TextArea';
type Props = Omit<TextAreaProps, 'autoComplete' | 'onChange'> & {
    onChange: NonNullable<TextAreaProps['onChange']>;
    autoComplete?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['autoComplete'];
};
export declare function TextAreaControl(props: Props): React.JSX.Element;
export {};
