import type { ColSize, IsMediaActive, MediaPartial, MediaProps, MediaType, Space } from '../types';
export declare const isMediaActiveFactory: (activeType: MediaType) => IsMediaActive;
export declare const getClosestMediaPropsFactory: (currentActive: MediaType) => <T = unknown>(medias?: Partial<MediaProps<T>>) => T | undefined;
export declare const makeCssMod: (space: Space | ColSize) => string;
