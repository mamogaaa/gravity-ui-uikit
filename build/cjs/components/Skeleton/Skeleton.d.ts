import React from 'react';
export interface SkeletonProps extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
}
export declare function Skeleton({ className, style }: SkeletonProps): React.JSX.Element;
