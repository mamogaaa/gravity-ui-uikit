import React from 'react';
import type { ButtonProps } from '../Button';
import type { MenuProps } from '../Menu';
import type { PopupProps } from '../Popup';
import type { DropdownMenuItem, DropdownMenuItemAction, DropdownMenuItemMixed, DropdownMenuSize } from './types';
import './DropdownMenu.css';
type SwitcherProps = {
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
    onClick: React.MouseEventHandler<HTMLElement>;
};
export type DropdownMenuProps<T> = {
    /**
     * Array of items.
     * Nested arrays of items represent visually separated groups.
     */
    items?: (DropdownMenuItem<T> | DropdownMenuItem<T>[])[];
    /**
     * Switcher icon.
     */
    icon?: React.ReactNode;
    open?: boolean;
    onOpenToggle?: (open: boolean) => void;
    hideOnScroll?: boolean;
    /**
     * Applied for the switcher and the menu.
     */
    size?: DropdownMenuSize;
    /**
     * A payload passed to the actions called from the menu.
     * (Can be useful for context menus.)
     */
    data?: T;
    /**
     * Setting this prop to `true` disables the switcher button
     * and prevents the menu from being opened.
     */
    disabled?: boolean;
    /**
     * Menu toggle control.
     * @deprecated Use renderSwitcher instead
     */
    switcher?: React.ReactNode;
    /**
     * Menu toggle control.
     */
    renderSwitcher?: (props: SwitcherProps) => React.ReactNode;
    switcherWrapperClassName?: string;
    /**
     * Overrides the default switcher button props.
     */
    defaultSwitcherProps?: ButtonProps;
    defaultSwitcherClassName?: string;
    onSwitcherClick?: React.MouseEventHandler<HTMLElement>;
    /**
     * Overrides the default dropdown menu props.
     */
    menuProps?: Partial<MenuProps>;
    /**
     * Overrides the default dropdown popup props.
     */
    popupProps?: Partial<PopupProps>;
    /**
     * Custom content inside the menu popup.
     */
    children?: React.ReactNode;
};
export type ControlledDropdownMenuProps<T> = DropdownMenuProps<T> & {
    open: boolean;
    onOpenToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
declare const DropdownMenuExport: (<T>({ items, size, icon, open, onOpenToggle, hideOnScroll, data, disabled, switcher, renderSwitcher, switcherWrapperClassName, defaultSwitcherProps, defaultSwitcherClassName, onSwitcherClick, menuProps, popupProps, children, }: DropdownMenuProps<T> | ControlledDropdownMenuProps<T>) => React.JSX.Element) & {
    Item: <T_1>({ text, action, items: subMenuItems, popupProps, closeMenu, children, path, ...props }: import("./DropdownMenuItem").DropdownMenuItemProps<T_1>) => React.JSX.Element;
};
export { DropdownMenuExport as DropdownMenu };
export type { DropdownMenuItem, DropdownMenuItemMixed, DropdownMenuItemAction };
