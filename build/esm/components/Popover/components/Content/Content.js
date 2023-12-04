import React from 'react';
import { cnPopover } from '../../Popover.classname';
export const Content = ({ secondary, htmlContent, content, className }) => {
    if (!htmlContent && !content) {
        return null;
    }
    if (htmlContent) {
        return (React.createElement("div", { className: cnPopover('tooltip-content', { secondary }, className), dangerouslySetInnerHTML: {
                __html: htmlContent,
            } }));
    }
    if (content) {
        return (React.createElement("div", { className: cnPopover('tooltip-content', { secondary }, className) }, content));
    }
    return null;
};
