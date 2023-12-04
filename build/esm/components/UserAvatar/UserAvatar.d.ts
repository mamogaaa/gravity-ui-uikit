import React from 'react';
import type { UserAvatarSize } from './types';
import './UserAvatar.css';
export interface UserAvatarProps {
    imgUrl?: string;
    fallbackImgUrl?: string;
    size?: UserAvatarSize;
    srcSet?: string;
    sizes?: string;
    title?: string;
    className?: string;
    loading?: 'eager' | 'lazy';
    /** @deprecated Use appropriate component, like `<Button/>` instead */
    onClick?: () => void;
}
export declare const UserAvatar: React.ForwardRefExoticComponent<UserAvatarProps & React.RefAttributes<HTMLDivElement>>;
