"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockIcon = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const svg_1 = require("../../../../utils/svg");
function LockIcon(props) {
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", width: "16", height: "16", fill: "currentColor" }, svg_1.a11yHiddenSvgProps, props),
        react_1.default.createElement("path", { d: "M5.75 6.232C5.75 3.811 6.953 3.5 8 3.5s2.25.31 2.25 2.732V7h-4.5v-.768zm6 .768v-.768C11.75 2.55 9.4 2 8 2s-3.75.55-3.75 4.232V7H3v7h10V7h-1.25z" })));
}
exports.LockIcon = LockIcon;
