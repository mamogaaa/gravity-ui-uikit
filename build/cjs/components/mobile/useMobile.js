"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMobile = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const MobileContext_1 = require("./MobileContext");
function useMobile() {
    const { mobile, setMobile } = react_1.default.useContext(MobileContext_1.MobileContext);
    return [mobile, setMobile];
}
exports.useMobile = useMobile;
