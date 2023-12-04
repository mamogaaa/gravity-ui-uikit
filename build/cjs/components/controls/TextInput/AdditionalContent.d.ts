import React from 'react';
type Props = {
    placement: 'left' | 'right';
    children?: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLDivElement>;
};
export declare const AdditionalContent: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
export {};
