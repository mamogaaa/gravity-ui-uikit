import React from 'react';
import { useLayoutContext } from '../hooks/useLayoutContext';
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
export const useContainerThemeProps = () => {
    const { theme, getClosestMediaProps } = useLayoutContext();
    const containerThemeProps = React.useMemo(() => {
        var _a, _b, _c;
        return (Object.assign(Object.assign({}, pickContainerProps((_a = theme.components) === null || _a === void 0 ? void 0 : _a.container)), pickContainerProps(getClosestMediaProps((_c = (_b = theme.components) === null || _b === void 0 ? void 0 : _b.container) === null || _c === void 0 ? void 0 : _c.media))));
    }, [getClosestMediaProps, theme]);
    return {
        getClosestMediaProps,
        containerThemeProps,
    };
};