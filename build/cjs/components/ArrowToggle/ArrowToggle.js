"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrowToggle = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../Icon");
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('arrow-toggle');
function ArrowToggle({ size = 16, direction = 'bottom', className }) {
    return (react_1.default.createElement("span", { style: { width: size, height: size }, className: b({ direction }, className) },
        react_1.default.createElement(Icon_1.Icon, { data: icons_1.ChevronDown, size: size })));
}
exports.ArrowToggle = ArrowToggle;
