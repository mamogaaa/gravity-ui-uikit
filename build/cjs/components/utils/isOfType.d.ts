import React from 'react';
export declare function isOfType<P = {}>(Component: React.ComponentType<P>): (component: React.ReactNode) => component is React.ReactElement<P, typeof React.Component>;
