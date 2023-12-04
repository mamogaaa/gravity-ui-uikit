export declare const useContainerThemeProps: () => {
    getClosestMediaProps: <T = unknown>(medias?: Partial<import("../types").MediaProps<T>>) => T | undefined;
    containerThemeProps: {
        gutters?: import("../types").Space | undefined;
        spaceRow?: import("../types").Space | undefined;
    };
};
