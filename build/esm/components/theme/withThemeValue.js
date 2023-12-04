import React from 'react';
import { getComponentName } from '../utils/getComponentName';
import { ThemeContext } from './ThemeContext';
export function withThemeValue(WrappedComponent) {
    var _a;
    const componentName = getComponentName(WrappedComponent);
    return _a = class WithThemeValueComponent extends React.Component {
            render() {
                return React.createElement(WrappedComponent, Object.assign({}, this.props, { themeValue: this.context.themeValue }));
            }
        },
        _a.displayName = `withThemeValue(${componentName})`,
        _a.contextType = ThemeContext,
        _a;
}
