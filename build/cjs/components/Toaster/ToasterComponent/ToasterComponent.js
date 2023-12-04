"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToasterComponent = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const mobile_1 = require("../../mobile");
const ToastsContext_1 = require("../Provider/ToastsContext");
const ToastList_1 = require("../ToastList/ToastList");
const useToaster_1 = require("../hooks/useToaster");
const ToasterPortal_1 = require("./ToasterPortal");
function ToasterComponent({ className, mobile, hasPortal = true }) {
    const [defaultMobile] = (0, mobile_1.useMobile)();
    const { remove } = (0, useToaster_1.useToaster)();
    const list = react_1.default.useContext(ToastsContext_1.ToastsContext);
    const toaster = (react_1.default.createElement(ToastList_1.ToastList, { toasts: list, removeCallback: remove, mobile: mobile !== null && mobile !== void 0 ? mobile : defaultMobile }));
    if (!hasPortal) {
        return toaster;
    }
    return (react_1.default.createElement(ToasterPortal_1.ToasterPortal, { className: className || '', mobile: mobile !== null && mobile !== void 0 ? mobile : defaultMobile }, toaster));
}
exports.ToasterComponent = ToasterComponent;
ToasterComponent.displayName = 'ToasterComponent';
