"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withThemeValue = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const getComponentName_1 = require("../utils/getComponentName");
const ThemeContext_1 = require("./ThemeContext");
function withThemeValue(WrappedComponent) {
    var _a;
    const componentName = (0, getComponentName_1.getComponentName)(WrappedComponent);
    return _a = class WithThemeValueComponent extends react_1.default.Component {
            render() {
                return react_1.default.createElement(WrappedComponent, Object.assign({}, this.props, { themeValue: this.context.themeValue }));
            }
        },
        _a.displayName = `withThemeValue(${componentName})`,
        _a.contextType = ThemeContext_1.ThemeContext,
        _a;
}
exports.withThemeValue = withThemeValue;
