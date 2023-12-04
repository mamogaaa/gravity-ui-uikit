import React from 'react';
import type { UserAvatarSize } from '../UserAvatar';
export interface UserProps {
    name?: string;
    description?: string;
    imgUrl?: string;
    size?: UserAvatarSize;
    className?: string;
}
export declare function User({ name, description, imgUrl, size, className }: UserProps): React.JSX.Element;
