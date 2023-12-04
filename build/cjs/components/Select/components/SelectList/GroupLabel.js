"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupLabel = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../../utils/cn");
const b = (0, cn_1.blockNew)('select-list');
const GroupLabel = ({ option, renderOptionGroup }) => {
    if (renderOptionGroup) {
        return react_1.default.createElement("div", { className: b('group-label-custom') }, renderOptionGroup(option));
    }
    else {
        return (react_1.default.createElement("div", { className: b('group-label', { empty: option.label === '' }) },
            react_1.default.createElement("div", { className: b('group-label-content') }, option.label)));
    }
};
exports.GroupLabel = GroupLabel;
