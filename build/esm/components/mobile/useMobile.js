import React from 'react';
import { MobileContext } from './MobileContext';
export function useMobile() {
    const { mobile, setMobile } = React.useContext(MobileContext);
    return [mobile, setMobile];
}
