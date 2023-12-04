import React from 'react';
import type { HotkeyProps } from '../Hotkey';
import type { TooltipProps } from '../Tooltip';
export interface ActionTooltipProps extends Pick<TooltipProps, 'children' | 'disabled' | 'placement' | 'openDelay' | 'closeDelay' | 'className'> {
    title: string;
    hotkey?: HotkeyProps['value'];
    description?: React.ReactNode;
}
export declare function ActionTooltip(props: ActionTooltipProps): React.JSX.Element;
