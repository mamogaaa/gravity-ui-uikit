"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenuNavigationContextProvider = exports.DropdownMenuNavigationContext = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const rootMenuPath = [];
exports.DropdownMenuNavigationContext = react_1.default.createContext({
    activeMenuPath: rootMenuPath,
    setActiveMenuPath: () => { },
    anchorRef: { current: null },
});
const DropdownMenuNavigationContextProvider = ({ anchorRef, children, disabled, }) => {
    const [activeMenuPath, setActiveMenuPath] = react_1.default.useState(rootMenuPath);
    react_1.default.useEffect(() => {
        if (disabled) {
            setActiveMenuPath(rootMenuPath);
        }
    }, [disabled]);
    const contextValue = react_1.default.useMemo(() => ({
        activeMenuPath,
        setActiveMenuPath,
        anchorRef,
    }), [activeMenuPath, anchorRef]);
    return (react_1.default.createElement(exports.DropdownMenuNavigationContext.Provider, { value: contextValue }, children));
};
exports.DropdownMenuNavigationContextProvider = DropdownMenuNavigationContextProvider;
