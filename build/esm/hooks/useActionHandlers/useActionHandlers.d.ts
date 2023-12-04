import React from 'react';
type AnyFunction = (...args: any[]) => any;
export type UseActionHandlersProps = AnyFunction;
export interface UseActionHandlersResult<T> {
    onKeyDown: React.KeyboardEventHandler<T>;
}
/**
 * Emulates behaviour of system controls, that respond to Enter and Spacebar
 * @param callback
 * @return {onKeyDown}
 */
export declare function useActionHandlers<T>(callback?: UseActionHandlersProps): UseActionHandlersResult<T>;
export {};
