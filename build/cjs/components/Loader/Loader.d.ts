import React from 'react';
export type LoaderSize = 's' | 'm' | 'l';
export interface LoaderProps {
    className?: string;
    size?: LoaderSize;
}
export declare function Loader({ size, className }: LoaderProps): React.JSX.Element;
