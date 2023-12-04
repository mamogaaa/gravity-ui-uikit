"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileProvider = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const MobileContext_1 = require("./MobileContext");
const constants_1 = require("./constants");
function useHistoryMock() {
    return { action: '', replace() { }, push() { }, goBack() { } };
}
function useLocationMock() {
    return { pathname: '', search: '', hash: '' };
}
function MobileProvider({ mobile = false, platform = constants_1.Platform.BROWSER, useHistory = useHistoryMock, useLocation = useLocationMock, children, }) {
    const [mobileValue, setMobile] = react_1.default.useState(mobile);
    const [platformValue, setPlatform] = react_1.default.useState(platform);
    const useHistoryFunction = react_1.default.useCallback(function useHistoryFunction() {
        const _a = useHistory(), { goBack, back } = _a, props = tslib_1.__rest(_a, ["goBack", "back"]);
        let goBackFunction;
        if (typeof goBack === 'function') {
            goBackFunction = goBack;
        }
        else if (typeof back === 'function') {
            goBackFunction = back;
        }
        else {
            goBackFunction = () => { };
        }
        return Object.assign(Object.assign({}, props), { goBack: goBackFunction });
    }, [useHistory]);
    react_1.default.useEffect(() => {
        document.body.classList.toggle(constants_1.rootMobileClassName, mobileValue);
    }, [constants_1.rootMobileClassName, mobileValue]);
    const state = react_1.default.useMemo(() => {
        return {
            mobile: mobileValue,
            setMobile,
            platform: platformValue,
            setPlatform,
            useLocation,
            useHistory: useHistoryFunction,
        };
    }, [mobileValue, platformValue, useLocation, useHistoryFunction]);
    return react_1.default.createElement(MobileContext_1.MobileContext.Provider, { value: state }, children);
}
exports.MobileProvider = MobileProvider;
