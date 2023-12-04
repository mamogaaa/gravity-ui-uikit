/**
 * @deprecated use UseIntersectionProps instead
 */
export type UseIntersection = {
    element: Element | null;
    options?: IntersectionObserverInit;
    onIntersect?: () => void;
};
export type UseIntersectionProps = UseIntersection;
export declare const useIntersection: ({ element, options, onIntersect }: UseIntersectionProps) => void;
