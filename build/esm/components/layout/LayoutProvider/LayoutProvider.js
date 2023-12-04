/* eslint-disable valid-jsdoc */
import React from 'react';
import { LayoutContext } from '../contexts/LayoutContext';
import { useCurrentActiveMediaQuery } from '../hooks/useCurrentActiveMediaQuery';
import { makeLayoutDefaultTheme } from '../utils/makeLayoutDefaultTheme';
/**
 * Provide context for layout components and current media queries.
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#layoutprovider-and-layouttheme
 */
export function LayoutProvider({ children, theme: override, initialMediaQuery, }) {
    const theme = makeLayoutDefaultTheme({ override });
    const activeMediaQuery = useCurrentActiveMediaQuery(theme.breakpoints, initialMediaQuery);
    return (React.createElement(LayoutContext.Provider, { value: {
            activeMediaQuery,
            theme,
        } }, children));
}
