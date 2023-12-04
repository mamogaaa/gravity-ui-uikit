"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('loader');
function Loader({ size = 's', className }) {
    return (react_1.default.createElement("div", { className: b({ size }, className) },
        react_1.default.createElement("div", { className: b('left') }),
        react_1.default.createElement("div", { className: b('center') }),
        react_1.default.createElement("div", { className: b('right') })));
}
exports.Loader = Loader;
