import React from 'react';
import type { Subtract } from 'utility-types';
import type { ThemeContextProps } from './ThemeContext';
export interface WithThemeValueProps extends ThemeContextProps {
}
export declare function withThemeValue<T extends WithThemeValueProps>(WrappedComponent: React.ComponentType<T>): React.ComponentType<Subtract<T, WithThemeValueProps>>;
