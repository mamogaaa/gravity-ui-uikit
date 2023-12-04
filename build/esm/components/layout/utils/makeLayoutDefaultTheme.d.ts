import type { LayoutTheme, RecursivePartial } from '../types';
interface MakeDefaultLayoutTheme {
    override?: RecursivePartial<LayoutTheme>;
}
/**
 * Use this function to override default `DEFAULT_LAYOUT_THEME`
 */
export declare const makeLayoutDefaultTheme: ({ override, }?: MakeDefaultLayoutTheme | undefined) => LayoutTheme;
export {};
