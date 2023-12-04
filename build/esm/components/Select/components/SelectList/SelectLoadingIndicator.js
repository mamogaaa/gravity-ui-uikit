import React from 'react';
import { useIntersection } from '../../../../hooks';
import { Loader } from '../../../Loader/Loader';
import { selectListBlock } from '../../constants';
export const SelectLoadingIndicator = (props) => {
    const ref = React.useRef(null);
    useIntersection({ element: ref.current, onIntersect: props === null || props === void 0 ? void 0 : props.onIntersect });
    return (React.createElement("div", { ref: ref, className: selectListBlock('loading-indicator') },
        React.createElement(Loader, null)));
};
