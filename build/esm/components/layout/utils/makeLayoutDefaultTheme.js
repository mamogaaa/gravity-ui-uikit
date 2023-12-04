/* eslint-disable valid-jsdoc */
import merge from 'lodash/merge';
import { DEFAULT_LAYOUT_THEME } from '../constants';
/**
 * Use this function to override default `DEFAULT_LAYOUT_THEME`
 */
export const makeLayoutDefaultTheme = ({ override, } = {}) => {
    return merge(DEFAULT_LAYOUT_THEME, override);
};
