import type { SelectSize } from './types';
export declare const selectBlock: import("@bem-react/classname").ClassNameFormatter;
export declare const selectControlBlock: import("@bem-react/classname").ClassNameFormatter;
export declare const selectControlButtonBlock: import("@bem-react/classname").ClassNameFormatter;
export declare const selectListBlock: import("@bem-react/classname").ClassNameFormatter;
export declare const selectClearBlock: import("@bem-react/classname").ClassNameFormatter;
export declare const SIZE_TO_ITEM_HEIGHT: Record<SelectSize, number>;
export declare const MOBILE_ITEM_HEIGHT = 32;
export declare const GROUP_ITEM_MARGIN_TOP = 5;
export declare const BORDER_WIDTH = 1;
export declare const POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE = 100;
export declare const QUICK_SEARCH_TIMEOUT = 2000;
export declare const DEFAULT_VIRTUALIZATION_THRESHOLD = 50;
export declare const SelectQa: {
    LIST: string;
    POPUP: string;
    SHEET: string;
    CLEAR: string;
};
