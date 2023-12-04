import React from 'react';
import { Platform } from './constants';
const initialValue = {
    mobile: false,
    platform: Platform.BROWSER,
    useHistory: () => ({ action: '', replace() { }, push() { }, goBack() { } }),
    useLocation: () => ({ pathname: '', search: '', hash: '' }),
    setMobile: () => { },
    setPlatform: () => { },
};
export const MobileContext = React.createContext(initialValue);
