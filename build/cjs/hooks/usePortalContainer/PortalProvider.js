"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalProvider = exports.PortalContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
exports.PortalContext = react_1.default.createContext({ current: null });
exports.PortalContext.displayName = 'PortalContext';
function PortalProvider({ container, children }) {
    return react_1.default.createElement(exports.PortalContext.Provider, { value: container }, children);
}
exports.PortalProvider = PortalProvider;
