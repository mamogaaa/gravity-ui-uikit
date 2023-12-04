import { __rest } from "tslib";
import React from 'react';
import { MobileContext } from './MobileContext';
import { Platform, rootMobileClassName } from './constants';
function useHistoryMock() {
    return { action: '', replace() { }, push() { }, goBack() { } };
}
function useLocationMock() {
    return { pathname: '', search: '', hash: '' };
}
export function MobileProvider({ mobile = false, platform = Platform.BROWSER, useHistory = useHistoryMock, useLocation = useLocationMock, children, }) {
    const [mobileValue, setMobile] = React.useState(mobile);
    const [platformValue, setPlatform] = React.useState(platform);
    const useHistoryFunction = React.useCallback(function useHistoryFunction() {
        const _a = useHistory(), { goBack, back } = _a, props = __rest(_a, ["goBack", "back"]);
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
    React.useEffect(() => {
        document.body.classList.toggle(rootMobileClassName, mobileValue);
    }, [rootMobileClassName, mobileValue]);
    const state = React.useMemo(() => {
        return {
            mobile: mobileValue,
            setMobile,
            platform: platformValue,
            setPlatform,
            useLocation,
            useHistory: useHistoryFunction,
        };
    }, [mobileValue, platformValue, useLocation, useHistoryFunction]);
    return React.createElement(MobileContext.Provider, { value: state }, children);
}
