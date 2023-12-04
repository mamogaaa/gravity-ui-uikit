/// <reference types="react" />
import type { VirtualElement } from '@popperjs/core';
export type LayerCloseReason = 'outsideClick' | 'escapeKeyDown';
export interface LayerExtendableProps {
    disableOutsideClick?: boolean;
    disableEscapeKeyDown?: boolean;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onEnterKeyDown?: (event: KeyboardEvent) => void;
    onOutsideClick?: (event: MouseEvent) => void;
    onClose?: (event: MouseEvent | KeyboardEvent, reason: LayerCloseReason) => void;
    type?: string;
}
type ContentElement = Element | (VirtualElement & {
    contains?: (other: Node | null) => boolean;
});
export interface LayerConfig extends LayerExtendableProps {
    contentRefs?: Array<React.RefObject<ContentElement> | undefined>;
}
declare class LayerManager {
    private stack;
    private mouseDownLayerTarget?;
    add(config: LayerConfig): void;
    remove(config: LayerConfig): void;
    getLayersCount(): number;
    getLayers(): {
        type: string | undefined;
    }[];
    private addListeners;
    private removeListeners;
    private notifyLayersChange;
    private handleDocumentKeyDown;
    private handleDocumentClick;
    private handleDocumentMouseDown;
    private getTopLayer;
    private isOutsideClick;
    private isToastClick;
}
export declare const layerManager: LayerManager;
export declare const getLayersCount: () => number;
export {};
