import React from 'react';
import type { QAProps } from '../types';
import { DisclosureSummary } from './DisclosureSummary/DisclosureSummary';
export type DisclosureSize = 'm' | 'l' | 'xl';
export type DisclosureArrowPosition = 'left' | 'right';
export interface DisclosureComposition {
    Summary: typeof DisclosureSummary;
}
export interface DisclosureProps extends QAProps {
    /** Disclosure size */
    size?: DisclosureSize;
    /** Disabled state */
    disabled?: boolean;
    /** Default opening state */
    defaultExpanded?: boolean;
    /** Controlled opening state */
    expanded?: boolean;
    /** Control position */
    arrowPosition?: DisclosureArrowPosition;
    /** Content summary */
    summary?: string;
    /** Class name */
    className?: string;
    /** Content */
    children?: React.ReactNode;
    /** Keep content in DOM */
    keepMounted?: boolean;
    /** Callback fired when the expand/collapse state is changed  */
    onUpdate?: (expanded: boolean) => void;
}
export declare const Disclosure: React.FunctionComponent<DisclosureProps> & DisclosureComposition;
