import React from 'react';
import { useIntersection } from '../../hooks';
import { Loader } from '../Loader';
import { block } from '../utils/cn';
const b = block('list');
export const SelectLoadingIndicator = (props) => {
    const ref = React.useRef(null);
    useIntersection({ element: ref.current, onIntersect: props === null || props === void 0 ? void 0 : props.onIntersect });
    return (React.createElement("div", { ref: ref, className: b('loading-indicator') },
        React.createElement(Loader, null)));
};
