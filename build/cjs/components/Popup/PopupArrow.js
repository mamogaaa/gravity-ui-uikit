"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupArrow = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('popup');
function PopupArrow({ styles, attributes, setArrowRef }) {
    return (react_1.default.createElement("div", Object.assign({ "data-popper-arrow": true, ref: setArrowRef, className: b('arrow'), style: styles }, attributes),
        react_1.default.createElement("div", { className: b('arrow-content') },
            react_1.default.createElement("div", { className: b('arrow-circle-wrapper') },
                react_1.default.createElement("div", { className: b('arrow-circle', { left: true }) })),
            react_1.default.createElement("div", { className: b('arrow-circle-wrapper') },
                react_1.default.createElement("div", { className: b('arrow-circle', { right: true }) })))));
}
exports.PopupArrow = PopupArrow;
