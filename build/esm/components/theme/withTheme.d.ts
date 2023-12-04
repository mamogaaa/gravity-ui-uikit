import React from 'react';
import type { Subtract } from 'utility-types';
import type { ThemeContextProps } from './ThemeContext';
export interface WithThemeProps extends ThemeContextProps {
}
export declare function withTheme<T extends WithThemeProps>(WrappedComponent: React.ComponentType<T>): React.ComponentType<Subtract<T, WithThemeProps>>;
