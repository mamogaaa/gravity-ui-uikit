"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContainerThemeProps = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const useLayoutContext_1 = require("../hooks/useLayoutContext");
const pickContainerProps = ({ gutters, spaceRow, space, } = {}) => {
    const res = {};
    if (gutters) {
        res.gutters = gutters;
    }
    if (spaceRow || space) {
        res.spaceRow = spaceRow || space;
    }
    return res;
};
const useContainerThemeProps = () => {
    const { theme, getClosestMediaProps } = (0, useLayoutContext_1.useLayoutContext)();
    const containerThemeProps = react_1.default.useMemo(() => {
        var _a, _b, _c;
        return (Object.assign(Object.assign({}, pickContainerProps((_a = theme.components) === null || _a === void 0 ? void 0 : _a.container)), pickContainerProps(getClosestMediaProps((_c = (_b = theme.components) === null || _b === void 0 ? void 0 : _b.container) === null || _c === void 0 ? void 0 : _c.media))));
    }, [getClosestMediaProps, theme]);
    return {
        getClosestMediaProps,
        containerThemeProps,
    };
};
exports.useContainerThemeProps = useContainerThemeProps;
