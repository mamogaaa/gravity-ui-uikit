"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portal = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
const hooks_1 = require("../../hooks");
function Portal({ container, children, disablePortal }) {
    const defaultContainer = (0, hooks_1.usePortalContainer)();
    const containerNode = container !== null && container !== void 0 ? container : defaultContainer;
    if (disablePortal) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return containerNode ? react_dom_1.default.createPortal(children, containerNode) : null;
}
exports.Portal = Portal;
