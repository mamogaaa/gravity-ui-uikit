import React from 'react';
import { Portal } from '../../Portal';
import { block } from '../../utils/cn';
const b = block('toaster');
export function ToasterPortal({ children, className, mobile }) {
    const el = React.useRef(typeof document === 'undefined' ? undefined : document.createElement('div'));
    React.useEffect(() => {
        const container = el.current;
        if (!container) {
            return undefined;
        }
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        };
    }, []);
    React.useEffect(() => {
        if (!el.current) {
            return;
        }
        el.current.className = b({ mobile }, className);
    }, [className, mobile]);
    return React.createElement(Portal, { container: el.current }, children);
}
ToasterPortal.displayName = 'ToasterPortal';
