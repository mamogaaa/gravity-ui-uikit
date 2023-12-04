import React from 'react';
import type { LayoutTheme, MediaType, RecursivePartial } from '../types';
interface LayoutProviderProps {
    theme?: RecursivePartial<LayoutTheme>;
    /**
     * During ssr you can override default (`s`) media screen size
     */
    initialMediaQuery?: MediaType;
    children: React.ReactNode;
}
/**
 * Provide context for layout components and current media queries.
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#layoutprovider-and-layouttheme
 */
export declare function LayoutProvider({ children, theme: override, initialMediaQuery, }: LayoutProviderProps): React.JSX.Element;
export {};
