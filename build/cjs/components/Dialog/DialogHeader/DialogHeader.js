"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogHeader = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../utils/cn");
const b = (0, cn_1.block)('dialog-header');
function DialogHeader(props) {
    const { caption = '', insertBefore, insertAfter, className, id } = props;
    return (react_1.default.createElement("div", { className: b(null, className) },
        insertBefore,
        react_1.default.createElement("div", { className: b('caption'), id: id }, caption),
        insertAfter));
}
exports.DialogHeader = DialogHeader;
