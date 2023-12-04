import React from 'react';
import type { RealTheme, Theme } from './types';
interface ThemeProviderExternalProps {
}
interface ThemeProviderDefaultProps {
    theme: Theme;
    systemLightTheme: RealTheme;
    systemDarkTheme: RealTheme;
    nativeScrollbar: boolean;
    scoped: boolean;
    rootClassName: string;
}
export interface ThemeProviderProps extends ThemeProviderExternalProps, Partial<ThemeProviderDefaultProps>, React.PropsWithChildren<{}> {
}
export declare function ThemeProvider({ theme, systemLightTheme, systemDarkTheme, nativeScrollbar, scoped, rootClassName, children, }: ThemeProviderProps): React.JSX.Element;
export declare namespace ThemeProvider {
    var displayName: string;
}
export {};
