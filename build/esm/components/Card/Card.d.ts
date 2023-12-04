import React from 'react';
import type { QAProps } from '../types';
import './Card.css';
type SelectionCardView = 'outlined' | 'clear';
type ContainerCardView = 'outlined' | 'filled' | 'raised';
export type CardType = 'selection' | 'action' | 'container';
export type CardTheme = 'normal' | 'info' | 'success' | /** @deprecated */ 'positive' | 'warning' | 'danger' | 'utility';
export type CardView = SelectionCardView | ContainerCardView;
export type CardSize = 'm' | 'l';
export interface CardProps extends QAProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    /** Card click handler. Available for type: 'selection', 'action' */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Disabled card. Available for type: 'selection', 'action' */
    disabled?: boolean;
    /** Selected card. Available for type: 'selection' */
    selected?: boolean;
    /** Card's type affects on available properties */
    type?: CardType;
    /** Available for type: 'container' and 'selection' */
    view?: CardView;
    /** Card's base color. Available for type: 'container' */
    theme?: CardTheme;
    /** Card's size affects on available properties*/
    size?: CardSize;
}
export declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
export {};
