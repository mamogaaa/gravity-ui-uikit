"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColPresenter = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Col_1 = require("../../Col/Col");
const Box_1 = require("../Box/Box");
// @ts-ignore-error
const pickSizeProps = ({ l, xl, s, m, xxl, xxxl, size } = {}) => {
    // skip empty values
    return Object.entries(Object.assign({ l, xl, s, m, xxl, xxxl, size }))
        .reduce((acc, [media, value]) => {
        if (value) {
            acc.push(`${media}=${value}`);
        }
        return acc;
    }, [])
        .join(', ');
};
const ColPresenter = (_a) => {
    var { children } = _a, props = tslib_1.__rest(_a, ["children"]);
    return (react_1.default.createElement(Col_1.Col, Object.assign({}, props),
        react_1.default.createElement(Box_1.Box, { style: { height: '100%' } }, children || pickSizeProps(props))));
};
exports.ColPresenter = ColPresenter;
