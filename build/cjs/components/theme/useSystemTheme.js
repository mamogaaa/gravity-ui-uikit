"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSystemTheme = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const getDarkMediaMatch_1 = require("./getDarkMediaMatch");
const getSystemTheme_1 = require("./getSystemTheme");
function addListener(matcher, handler) {
    const isLegacyMethod = typeof matcher.addEventListener !== 'function';
    if (isLegacyMethod) {
        matcher.addListener(handler);
    }
    else {
        matcher.addEventListener('change', handler);
    }
    return () => {
        if (isLegacyMethod) {
            matcher.removeListener(handler);
        }
        else {
            matcher.removeEventListener('change', handler);
        }
    };
}
function useSystemTheme() {
    const [theme, setTheme] = react_1.default.useState((0, getSystemTheme_1.getSystemTheme)());
    react_1.default.useEffect(() => {
        function onChange(event) {
            setTheme(event.matches ? 'dark' : 'light');
        }
        const matcher = (0, getDarkMediaMatch_1.getDarkMediaMatch)();
        const unsubscribe = addListener(matcher, onChange);
        return () => unsubscribe();
    }, []);
    return theme;
}
exports.useSystemTheme = useSystemTheme;
