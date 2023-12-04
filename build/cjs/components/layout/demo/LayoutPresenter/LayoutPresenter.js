"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutPresenter = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Text_1 = require("../../../Text");
const Flex_1 = require("../../Flex/Flex");
const LayoutProvider_1 = require("../../LayoutProvider/LayoutProvider");
const useLayoutContext_1 = require("../../hooks/useLayoutContext");
const spacing_1 = require("../../spacing/spacing");
function Title({ title }) {
    const { activeMediaQuery } = (0, useLayoutContext_1.useLayoutContext)();
    return (react_1.default.createElement(Flex_1.Flex, { direction: "column", space: "5", className: (0, spacing_1.sp)({ mb: '5' }) },
        title && (react_1.default.createElement(Text_1.Text, { variant: "subheader-2", as: "div" }, title)),
        react_1.default.createElement(Text_1.Text, { color: "secondary", as: "div" },
            "Active media query: ",
            activeMediaQuery)));
}
const LayoutPresenter = ({ children, title }) => {
    return (react_1.default.createElement(LayoutProvider_1.LayoutProvider, null,
        react_1.default.createElement(Title, { title: title }),
        react_1.default.createElement("div", { style: {
                width: '100%',
                height: '100%',
                border: '3px dashed lightgray',
            } }, children)));
};
exports.LayoutPresenter = LayoutPresenter;
