import React from 'react';
import './Loader.css';
export type LoaderSize = 's' | 'm' | 'l';
export interface LoaderProps {
    className?: string;
    size?: LoaderSize;
}
export declare function Loader({ size, className }: LoaderProps): React.JSX.Element;
