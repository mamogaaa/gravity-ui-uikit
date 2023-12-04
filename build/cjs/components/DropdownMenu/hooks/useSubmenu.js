"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSubmenu = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const DropdownMenuNavigationContext_1 = require("../DropdownMenuNavigationContext");
const isSubmenuOpen_1 = require("../utils/isSubmenuOpen");
function useSubmenu({ items, path }) {
    const { activeMenuPath, setActiveMenuPath } = react_1.default.useContext(DropdownMenuNavigationContext_1.DropdownMenuNavigationContext);
    const hasSubmenu = Boolean(path) && Boolean(items === null || items === void 0 ? void 0 : items.length);
    const closeSubmenu = react_1.default.useCallback(() => {
        if (!path) {
            return;
        }
        setActiveMenuPath(path.slice(0, path.length - 1));
    }, [path, setActiveMenuPath]);
    const openSubmenu = react_1.default.useCallback(() => {
        if (!path) {
            return;
        }
        setActiveMenuPath(path);
    }, [path, setActiveMenuPath]);
    return {
        hasSubmenu,
        isSubmenuOpen: (0, isSubmenuOpen_1.isSubmenuOpen)(path, activeMenuPath),
        openSubmenu,
        closeSubmenu,
    };
}
exports.useSubmenu = useSubmenu;
