import React from 'react';
import type { MobileContextProps } from '../mobile';
interface SheetContentBaseProps {
    hideSheet: () => void;
    content: React.ReactNode;
    visible: boolean;
    id?: string;
    title?: string;
    contentClassName?: string;
    swipeAreaClassName?: string;
    hideTopBar?: boolean;
}
interface SheetContentDefaultProps {
    id: string;
    allowHideOnContentScroll: boolean;
}
export declare const SheetContentContainer: React.ComponentType<import("utility-types").Subtract<MobileContextProps & SheetContentBaseProps & Partial<SheetContentDefaultProps>, import("../mobile").WithMobileProps>>;
export {};
