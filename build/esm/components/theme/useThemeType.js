import { getThemeType } from './getThemeType';
import { useThemeValue } from './useThemeValue';
export function useThemeType() {
    const themeValue = useThemeValue();
    return getThemeType(themeValue);
}
