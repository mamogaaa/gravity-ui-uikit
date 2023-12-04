import React from 'react';
import type { DOMProps, QAProps } from '../types';
export type ButtonView = 'normal' | 'action' | 'outlined' | 'outlined-info' | 'outlined-success' | 'outlined-warning' | 'outlined-danger' | 'outlined-utility' | 'outlined-action' | 'raised' | 'flat' | 'flat-secondary' | 'flat-info' | 'flat-success' | 'flat-warning' | 'flat-danger' | 'flat-utility' | 'flat-action' | 'normal-contrast' | 'outlined-contrast' | 'flat-contrast';
export type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type ButtonPin = 'round-round' | 'brick-brick' | 'clear-clear' | 'circle-circle' | 'round-brick' | 'brick-round' | 'round-clear' | 'clear-round' | 'brick-clear' | 'clear-brick' | 'circle-brick' | 'brick-circle' | 'circle-clear' | 'clear-circle';
export type ButtonWidth = 'auto' | 'max';
export interface ButtonProps extends DOMProps, QAProps {
    /** Button appearance */
    view?: ButtonView;
    size?: ButtonSize;
    pin?: ButtonPin;
    selected?: boolean;
    disabled?: boolean;
    loading?: boolean;
    width?: ButtonWidth;
    title?: string;
    tabIndex?: number;
    id?: string;
    type?: 'button' | 'submit' | 'reset';
    component?: React.ElementType;
    href?: string;
    target?: string;
    rel?: string;
    extraProps?: React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onFocus?: React.FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onBlur?: React.FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    /** Button content. You can mix button text with `<Icon/>` component */
    children?: React.ReactNode;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> & {
    Icon: {
        ({ side, className, children }: {
            className?: string | undefined;
            side?: "right" | "left" | undefined;
        } & {
            children?: React.ReactNode;
        }): React.JSX.Element;
        displayName: string;
    };
};
