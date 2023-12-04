"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withToaster = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const getComponentName_1 = require("../utils/getComponentName");
const useToaster_1 = require("./hooks/useToaster");
function withToaster() {
    return function (WrappedComponent) {
        function WithToaster(props) {
            const toaster = (0, useToaster_1.useToaster)();
            return react_1.default.createElement(WrappedComponent, Object.assign({}, props, { toaster: toaster }));
        }
        WithToaster.displayName = `WithToaster(${(0, getComponentName_1.getComponentName)(WrappedComponent)})`;
        return WithToaster;
    };
}
exports.withToaster = withToaster;
