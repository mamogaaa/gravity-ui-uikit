"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogBody = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../utils/cn");
const b = (0, cn_1.block)('dialog-body');
function DialogBody(props) {
    const { className } = props;
    return react_1.default.createElement("div", { className: b(null, className) }, props.children);
}
exports.DialogBody = DialogBody;
