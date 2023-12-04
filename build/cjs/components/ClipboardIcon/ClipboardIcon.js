"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipboardIcon = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const types_1 = require("../CopyToClipboard/types");
const cn_1 = require("../utils/cn");
const svg_1 = require("../utils/svg");
const b = (0, cn_1.block)('clipboard-icon');
const renderStatusPath = (path) => (react_1.default.createElement("path", { stroke: "currentColor", fill: "transparent", className: b('state'), strokeWidth: "1.5", d: path }));
const STATUS_PATH = {
    [types_1.CopyToClipboardStatus.Success]: renderStatusPath('M9.5 13l3 3l5 -5'),
    [types_1.CopyToClipboardStatus.Error]: renderStatusPath('M9.5 10l8 8m-8 0l8 -8'),
};
function ClipboardIcon({ size, status, className }) {
    return (react_1.default.createElement("svg", Object.assign({ width: size, height: size, viewBox: "0 0 24 24", className: b(null, className) }, svg_1.a11yHiddenSvgProps),
        react_1.default.createElement("path", { fill: "currentColor", d: "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" }),
        status === types_1.CopyToClipboardStatus.Pending ? null : STATUS_PATH[status]));
}
exports.ClipboardIcon = ClipboardIcon;
