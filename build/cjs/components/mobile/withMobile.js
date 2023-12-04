"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withMobile = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const getComponentName_1 = require("../utils/getComponentName");
const MobileContext_1 = require("./MobileContext");
function withMobile(WrappedComponent) {
    var _a;
    const componentName = (0, getComponentName_1.getComponentName)(WrappedComponent);
    return _a = class WithMobileComponent extends react_1.default.Component {
            render() {
                return (react_1.default.createElement(WrappedComponent, Object.assign({}, this.props, { mobile: this.context.mobile, platform: this.context.platform, useHistory: this.context.useHistory, useLocation: this.context.useLocation, setMobile: this.context.setMobile, setPlatform: this.context.setPlatform })));
            }
        },
        _a.displayName = `withMobile(${componentName})`,
        _a.contextType = MobileContext_1.MobileContext,
        _a;
}
exports.withMobile = withMobile;
