import React from 'react';
import { getComponentName } from '../utils/getComponentName';
import { ThemeContext } from './ThemeContext';
export function withTheme(WrappedComponent) {
    var _a;
    const componentName = getComponentName(WrappedComponent);
    return _a = class WithThemeComponent extends React.Component {
            render() {
                return React.createElement(WrappedComponent, Object.assign({}, this.props, { theme: this.context.theme }));
            }
        },
        _a.displayName = `withTheme(${componentName})`,
        _a.contextType = ThemeContext,
        _a;
}
