"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuickSearch = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const useQuickSearch = (props) => {
    const { onChange, open, disabled } = props;
    const [search, setSearch] = react_1.default.useState('');
    const [timer, setTimer] = react_1.default.useState();
    const handleTimer = react_1.default.useCallback((nextSearch) => {
        clearTimeout(timer);
        if (nextSearch) {
            const nextTimer = window.setTimeout(() => setSearch(''), constants_1.QUICK_SEARCH_TIMEOUT);
            setTimer(nextTimer);
        }
    }, [timer]);
    const handleSearch = react_1.default.useCallback((e) => {
        e.stopPropagation();
        const nextSearch = (0, utils_1.getNextQuickSearch)(e.key, search);
        if (search !== nextSearch) {
            handleTimer(nextSearch);
            setSearch(nextSearch);
        }
    }, [handleTimer, search]);
    react_1.default.useEffect(() => {
        if (open && !disabled) {
            document.addEventListener('keydown', handleSearch);
        }
        else if (!open && !disabled) {
            setSearch('');
        }
        return () => {
            if (open && !disabled) {
                document.removeEventListener('keydown', handleSearch);
            }
        };
    }, [handleSearch, open, disabled]);
    react_1.default.useEffect(() => {
        if (!open) {
            clearTimeout(timer);
        }
        return () => clearTimeout(timer);
    }, [open, timer]);
    react_1.default.useEffect(() => {
        onChange(search);
    }, [onChange, search]);
};
exports.useQuickSearch = useQuickSearch;
