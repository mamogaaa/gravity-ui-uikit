import React from 'react';
import { NAMESPACE_NEW } from '../../components/utils/cn';
import { getUniqId } from '../../components/utils/common';
function useUniqIdFallback() {
    const idRef = React.useRef();
    if (idRef.current === undefined) {
        idRef.current = getUniqId();
    }
    return idRef.current;
}
function useIdNative() {
    return `${NAMESPACE_NEW}${React.useId()}`;
}
export const useUniqId = typeof React.useId === 'function' ? useIdNative : useUniqIdFallback;
