"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickIcon = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const svg_1 = require("../../../../utils/svg");
function TickIcon(props) {
    return (react_1.default.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", width: "16", height: "16", fill: "currentColor" }, svg_1.a11yHiddenSvgProps, props),
        react_1.default.createElement("path", { d: "M5.95 11.008L1.863 6.572.392 7.927l5.533 6.003 9.67-10.114-1.444-1.381z" })));
}
exports.TickIcon = TickIcon;
