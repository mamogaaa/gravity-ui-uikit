"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const constants_1 = require("./constants");
const initialValue = {
    mobile: false,
    platform: constants_1.Platform.BROWSER,
    useHistory: () => ({ action: '', replace() { }, push() { }, goBack() { } }),
    useLocation: () => ({ pathname: '', search: '', hash: '' }),
    setMobile: () => { },
    setPlatform: () => { },
};
exports.MobileContext = react_1.default.createContext(initialValue);
