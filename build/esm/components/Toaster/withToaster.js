import React from 'react';
import { getComponentName } from '../utils/getComponentName';
import { useToaster } from './hooks/useToaster';
export function withToaster() {
    return function (WrappedComponent) {
        function WithToaster(props) {
            const toaster = useToaster();
            return React.createElement(WrappedComponent, Object.assign({}, props, { toaster: toaster }));
        }
        WithToaster.displayName = `WithToaster(${getComponentName(WrappedComponent)})`;
        return WithToaster;
    };
}
