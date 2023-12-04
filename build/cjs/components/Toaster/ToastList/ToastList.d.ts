import React from 'react';
import type { InternalToastProps } from '../types';
type ToastListProps = {
    removeCallback: (name: string) => void;
    toasts: InternalToastProps[];
    mobile?: boolean;
};
export declare function ToastList(props: ToastListProps): React.JSX.Element;
export {};
