"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Popover_classname_1 = require("../../Popover.classname");
const Content = ({ secondary, htmlContent, content, className }) => {
    if (!htmlContent && !content) {
        return null;
    }
    if (htmlContent) {
        return (react_1.default.createElement("div", { className: (0, Popover_classname_1.cnPopover)('tooltip-content', { secondary }, className), dangerouslySetInnerHTML: {
                __html: htmlContent,
            } }));
    }
    if (content) {
        return (react_1.default.createElement("div", { className: (0, Popover_classname_1.cnPopover)('tooltip-content', { secondary }, className) }, content));
    }
    return null;
};
exports.Content = Content;
