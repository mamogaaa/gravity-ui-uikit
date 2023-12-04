import React from 'react';
import { block } from '../utils/cn';
import { defsByPlatform } from './definitions';
import { parseKeyGroups } from './parse';
import { isMac } from './utils';
import './Hotkey.css';
const b = block('hotkey');
const Spaces = {
    BetweenGroups: String.fromCharCode(160),
    BetweenKeys: String.fromCharCode(8239), // Narrow No-Break Space
};
export const Hotkey = React.forwardRef(function Hotkey(props, ref) {
    const { value, platform, view = 'light', qa, style, className } = props;
    const groups = parseHotkeys(value, { platform });
    const content = [];
    let hasGroups = false;
    groups.forEach((keys, groupIdx) => {
        if (keys.length === 0)
            return;
        if (hasGroups) {
            content.push(Spaces.BetweenGroups);
        }
        else {
            hasGroups = true;
        }
        keys.forEach((key, keyIdx) => {
            const isFirstKey = keyIdx === 0;
            if (!isFirstKey) {
                content.push(Spaces.BetweenKeys, React.createElement("span", { key: `${key}_${groupIdx}_${keyIdx}_plus`, className: b('plus') }, "+"), Spaces.BetweenKeys);
            }
            content.push(React.createElement("kbd", { key: `${key}_${groupIdx}_${keyIdx}` }, key));
        });
    });
    if (content.length === 0)
        return null;
    return (React.createElement("kbd", { ref: ref, style: style, "data-qa": qa, className: b({ view }, className) }, content));
});
export function parseHotkeys(value, opts) {
    var _a;
    const platform = (_a = opts.platform) !== null && _a !== void 0 ? _a : (isMac() ? 'mac' : 'pc');
    const defs = defsByPlatform[platform];
    return parseKeyGroups(defs, value);
}
