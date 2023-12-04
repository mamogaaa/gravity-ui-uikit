import React from 'react';
import type { Subtract } from 'utility-types';
import type { MobileContextProps } from './MobileContext';
export interface WithMobileProps extends MobileContextProps {
}
export declare function withMobile<T extends WithMobileProps>(WrappedComponent: React.ComponentType<T>): React.ComponentType<Subtract<T, WithMobileProps>>;
