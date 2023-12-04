import React from 'react';
interface DisclosureSummaryRenderFunctionProps {
    onClick: (e: React.SyntheticEvent) => void;
    ariaControls: string;
    id: string;
    expanded: boolean;
    disabled?: boolean;
}
export interface DisclosureSummaryProps {
    children: (props: DisclosureSummaryRenderFunctionProps) => React.ReactElement;
}
export declare function DisclosureSummary({ children: renderFunction }: DisclosureSummaryProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export declare namespace DisclosureSummary {
    var displayName: string;
}
export declare function DefaultDisclosureSummary({ onClick, ariaControls, id, expanded, disabled, }: DisclosureSummaryRenderFunctionProps): React.JSX.Element;
export {};
