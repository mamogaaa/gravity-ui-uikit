"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutProvider = void 0;
const tslib_1 = require("tslib");
/* eslint-disable valid-jsdoc */
const react_1 = tslib_1.__importDefault(require("react"));
const LayoutContext_1 = require("../contexts/LayoutContext");
const useCurrentActiveMediaQuery_1 = require("../hooks/useCurrentActiveMediaQuery");
const makeLayoutDefaultTheme_1 = require("../utils/makeLayoutDefaultTheme");
/**
 * Provide context for layout components and current media queries.
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#layoutprovider-and-layouttheme
 */
function LayoutProvider({ children, theme: override, initialMediaQuery, }) {
    const theme = (0, makeLayoutDefaultTheme_1.makeLayoutDefaultTheme)({ override });
    const activeMediaQuery = (0, useCurrentActiveMediaQuery_1.useCurrentActiveMediaQuery)(theme.breakpoints, initialMediaQuery);
    return (react_1.default.createElement(LayoutContext_1.LayoutContext.Provider, { value: {
            activeMediaQuery,
            theme,
        } }, children));
}
exports.LayoutProvider = LayoutProvider;
