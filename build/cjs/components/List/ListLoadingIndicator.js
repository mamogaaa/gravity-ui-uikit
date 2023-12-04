"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectLoadingIndicator = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const hooks_1 = require("../../hooks");
const Loader_1 = require("../Loader");
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('list');
const SelectLoadingIndicator = (props) => {
    const ref = react_1.default.useRef(null);
    (0, hooks_1.useIntersection)({ element: ref.current, onIntersect: props === null || props === void 0 ? void 0 : props.onIntersect });
    return (react_1.default.createElement("div", { ref: ref, className: b('loading-indicator') },
        react_1.default.createElement(Loader_1.Loader, null)));
};
exports.SelectLoadingIndicator = SelectLoadingIndicator;
