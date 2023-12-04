"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spin = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('spin');
exports.Spin = react_1.default.forwardRef(function Spin(props, ref) {
    const { size = 'm', style, className, qa } = props;
    return (react_1.default.createElement("div", { ref: ref, style: style, className: b({ size }, className), "data-qa": qa },
        react_1.default.createElement("div", { className: b('inner') })));
});
