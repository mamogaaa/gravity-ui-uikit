"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlatform = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const MobileContext_1 = require("./MobileContext");
function usePlatform() {
    const { platform, setPlatform } = react_1.default.useContext(MobileContext_1.MobileContext);
    return [platform, setPlatform];
}
exports.usePlatform = usePlatform;
