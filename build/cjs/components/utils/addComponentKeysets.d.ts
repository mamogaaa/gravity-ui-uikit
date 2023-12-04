import type { KeysData } from '@gravity-ui/i18n';
import type { Lang } from './configure';
export declare function addComponentKeysets<T extends KeysData>(data: Record<Lang, T>, keysetName: string): (key: Extract<keyof T, string>, params?: import("@gravity-ui/i18n").Params | undefined) => string;
