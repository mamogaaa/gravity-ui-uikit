import React from 'react';
import { useMobile } from '../../mobile';
import { ToastsContext } from '../Provider/ToastsContext';
import { ToastList } from '../ToastList/ToastList';
import { useToaster } from '../hooks/useToaster';
import { ToasterPortal } from './ToasterPortal';
export function ToasterComponent({ className, mobile, hasPortal = true }) {
    const [defaultMobile] = useMobile();
    const { remove } = useToaster();
    const list = React.useContext(ToastsContext);
    const toaster = (React.createElement(ToastList, { toasts: list, removeCallback: remove, mobile: mobile !== null && mobile !== void 0 ? mobile : defaultMobile }));
    if (!hasPortal) {
        return toaster;
    }
    return (React.createElement(ToasterPortal, { className: className || '', mobile: mobile !== null && mobile !== void 0 ? mobile : defaultMobile }, toaster));
}
ToasterComponent.displayName = 'ToasterComponent';
