import React from 'react';
import { getComponentName } from '../utils/getComponentName';
import { MobileContext } from './MobileContext';
export function withMobile(WrappedComponent) {
    var _a;
    const componentName = getComponentName(WrappedComponent);
    return _a = class WithMobileComponent extends React.Component {
            render() {
                return (React.createElement(WrappedComponent, Object.assign({}, this.props, { mobile: this.context.mobile, platform: this.context.platform, useHistory: this.context.useHistory, useLocation: this.context.useLocation, setMobile: this.context.setMobile, setPlatform: this.context.setPlatform })));
            }
        },
        _a.displayName = `withMobile(${componentName})`,
        _a.contextType = MobileContext,
        _a;
}
