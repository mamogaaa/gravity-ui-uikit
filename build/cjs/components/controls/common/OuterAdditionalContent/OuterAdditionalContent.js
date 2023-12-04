"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OuterAdditionalContent = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../../utils/cn");
const utils_1 = require("../../utils");
const b = (0, cn_1.block)('outer-additional-content');
const OuterAdditionalContent = ({ errorMessage, note, noteId, errorMessageId, }) => {
    return errorMessage || note ? (react_1.default.createElement("div", { className: b() },
        errorMessage && (react_1.default.createElement("div", { className: b('error'), id: errorMessageId, "data-qa": utils_1.CONTROL_ERROR_MESSAGE_QA }, errorMessage)),
        note && (react_1.default.createElement("div", { className: b('note'), id: noteId }, note)))) : null;
};
exports.OuterAdditionalContent = OuterAdditionalContent;
