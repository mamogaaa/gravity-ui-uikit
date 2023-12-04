"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemTheme = void 0;
const getDarkMediaMatch_1 = require("./getDarkMediaMatch");
function getSystemTheme() {
    if (typeof window === 'object') {
        return (0, getDarkMediaMatch_1.getDarkMediaMatch)().matches ? 'dark' : 'light';
    }
    else {
        return 'light';
    }
}
exports.getSystemTheme = getSystemTheme;
