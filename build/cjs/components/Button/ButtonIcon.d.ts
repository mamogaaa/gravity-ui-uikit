import React from 'react';
type Props = React.PropsWithChildren<{
    className?: string;
    side?: 'left' | 'right';
}>;
export declare const ButtonIcon: {
    ({ side, className, children }: Props): React.JSX.Element;
    displayName: string;
};
export {};
