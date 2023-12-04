import React from 'react';
import type { DOMProps, QAProps } from '../types';
import './Link.css';
export type LinkView = 'normal' | 'primary' | 'secondary' | 'normal-visitable';
export interface LinkProps extends DOMProps, QAProps {
    /**
     * 'normal-visitable' view is deprecated, use 'visitable' prop instead
     */
    view?: LinkView;
    visitable?: boolean;
    title?: string;
    href?: string;
    target?: string;
    rel?: string;
    id?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
    onFocus?: React.FocusEventHandler<HTMLAnchorElement | HTMLSpanElement>;
    onBlur?: React.FocusEventHandler<HTMLAnchorElement | HTMLSpanElement>;
    extraProps?: React.AnchorHTMLAttributes<HTMLAnchorElement> | React.HTMLAttributes<HTMLSpanElement>;
}
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLElement>>;
