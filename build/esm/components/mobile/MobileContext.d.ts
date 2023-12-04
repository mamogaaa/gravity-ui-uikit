import React from 'react';
import { Platform } from './constants';
export interface History {
    action: 'PUSH' | 'POP' | 'REPLACE' | '';
    replace(location: Partial<Location>): void;
    push(location: Partial<Location>): void;
    goBack(): void;
}
export interface Location {
    pathname: string;
    search: string;
    hash: string;
}
export interface MobileContextProps {
    mobile: boolean;
    platform: Platform;
    useHistory: () => History;
    useLocation: () => Location;
    setMobile: (mobile: boolean, platform?: Platform) => void;
    setPlatform: (platform: Platform) => void;
}
export declare const MobileContext: React.Context<MobileContextProps>;
