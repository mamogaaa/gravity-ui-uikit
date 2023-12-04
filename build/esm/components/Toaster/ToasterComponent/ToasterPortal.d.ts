import React from 'react';
type Props = React.PropsWithChildren<{
    className: string;
    mobile?: boolean;
}>;
export declare function ToasterPortal({ children, className, mobile }: Props): React.JSX.Element;
export declare namespace ToasterPortal {
    var displayName: string;
}
export {};
