import React from 'react';
import { block } from '../utils/cn';
import { SIZES } from './constants';
import './UserAvatar.css';
const b = block('user-avatar');
export const UserAvatar = React.forwardRef(({ imgUrl, fallbackImgUrl, size = 'm', srcSet, sizes, title, className, loading, onClick }, ref) => {
    const [isErrored, setIsErrored] = React.useState(false);
    const handleError = React.useCallback(() => {
        setIsErrored(true);
    }, []);
    // Reset error if `imgUrl` was changed to check it again
    React.useEffect(() => {
        setIsErrored(false);
    }, [imgUrl]);
    return (
    // FIXME OnClick deprecated, will be deleted
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    React.createElement("div", { className: b({ size }, className), title: title, onClick: onClick, ref: ref },
        React.createElement("img", { loading: loading, className: b('figure'), width: SIZES[size], height: SIZES[size], src: fallbackImgUrl && isErrored ? fallbackImgUrl : imgUrl, srcSet: srcSet, sizes: sizes, alt: "", onError: handleError })));
});
UserAvatar.displayName = 'UserAvatar';
