import React from 'react';
import { MobileContext } from './MobileContext';
export function usePlatform() {
    const { platform, setPlatform } = React.useContext(MobileContext);
    return [platform, setPlatform];
}
