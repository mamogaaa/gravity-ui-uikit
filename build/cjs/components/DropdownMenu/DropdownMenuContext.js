"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenuContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
exports.DropdownMenuContext = react_1.default.createContext({
    toggle() { },
    data: undefined,
});
exports.DropdownMenuContext.displayName = 'DropdownMenu.Context';
