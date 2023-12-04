"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortIndicator = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../../../utils/cn");
const svg_1 = require("../../../../utils/svg");
const b = (0, cn_1.block)('sort-indicator');
function SortIndicator({ order = 'asc' }) {
    return (react_1.default.createElement("div", { className: b() },
        react_1.default.createElement("div", { className: b('caret'), style: { transform: order === 'asc' ? 'scale(1, -1)' : undefined } },
            react_1.default.createElement("svg", Object.assign({ width: "6", height: "3", viewBox: "0 0 6 3", fill: "currentColor" }, svg_1.a11yHiddenSvgProps),
                react_1.default.createElement("path", { d: "M0.404698 0C0.223319 0 0.102399 0.0887574 0.0419396 0.230769C-0.0386733 0.372781 0.00163315 0.497041 0.122552 0.60355L2.72232 2.89349C2.80293 2.9645 2.88354 3 3.00446 3C3.10523 3 3.20599 2.9645 3.28661 2.89349L5.88637 0.60355C6.00729 0.497041 6.02745 0.372781 5.96699 0.230769C5.88637 0.0887574 5.76545 0 5.60423 0H0.404698Z" })))));
}
exports.SortIndicator = SortIndicator;
