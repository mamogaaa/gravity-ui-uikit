import React from 'react';
/**
 * Wrap with label for `<Checkbox/>`, `<Radio/>`, `<Switch/>`
 */
export declare const ControlLabel: React.ForwardRefExoticComponent<{
    labelClassName?: string | undefined;
    title?: string | undefined;
    disabled?: boolean | undefined;
    size?: import("./types").Size | undefined;
    control: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
} & {
    children?: React.ReactNode;
} & import("..").DOMProps & import("..").QAProps & React.RefAttributes<HTMLLabelElement>>;
