import React from 'react';
interface PopupArrowProps {
    styles: React.CSSProperties;
    attributes?: Record<string, unknown>;
    setArrowRef: (value: HTMLDivElement) => void;
}
export declare function PopupArrow({ styles, attributes, setArrowRef }: PopupArrowProps): React.JSX.Element;
export {};
