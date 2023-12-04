"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUniqId = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../../components/utils/cn");
const common_1 = require("../../components/utils/common");
function useUniqIdFallback() {
    const idRef = react_1.default.useRef();
    if (idRef.current === undefined) {
        idRef.current = (0, common_1.getUniqId)();
    }
    return idRef.current;
}
function useIdNative() {
    return `${cn_1.NAMESPACE_NEW}${react_1.default.useId()}`;
}
exports.useUniqId = typeof react_1.default.useId === 'function' ? useIdNative : useUniqIdFallback;
