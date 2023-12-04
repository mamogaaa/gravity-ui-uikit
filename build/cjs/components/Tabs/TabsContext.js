"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
exports.TabsContext = react_1.default.createContext({
    activeTabId: undefined,
});
exports.TabsContext.displayName = 'TabsContext';
