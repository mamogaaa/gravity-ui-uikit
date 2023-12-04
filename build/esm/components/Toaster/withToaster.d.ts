import React from 'react';
export declare function withToaster<T>(): (WrappedComponent: React.ComponentType<T>) => {
    (props: T): React.JSX.Element;
    displayName: string;
};
