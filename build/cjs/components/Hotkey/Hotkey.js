"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHotkeys = exports.Hotkey = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const cn_1 = require("../utils/cn");
const definitions_1 = require("./definitions");
const parse_1 = require("./parse");
const utils_1 = require("./utils");
const b = (0, cn_1.block)('hotkey');
const Spaces = {
    BetweenGroups: String.fromCharCode(160),
    BetweenKeys: String.fromCharCode(8239), // Narrow No-Break Space
};
exports.Hotkey = react_1.default.forwardRef(function Hotkey(props, ref) {
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
                content.push(Spaces.BetweenKeys, react_1.default.createElement("span", { key: `${key}_${groupIdx}_${keyIdx}_plus`, className: b('plus') }, "+"), Spaces.BetweenKeys);
            }
            content.push(react_1.default.createElement("kbd", { key: `${key}_${groupIdx}_${keyIdx}` }, key));
        });
    });
    if (content.length === 0)
        return null;
    return (react_1.default.createElement("kbd", { ref: ref, style: style, "data-qa": qa, className: b({ view }, className) }, content));
});
function parseHotkeys(value, opts) {
    var _a;
    const platform = (_a = opts.platform) !== null && _a !== void 0 ? _a : ((0, utils_1.isMac)() ? 'mac' : 'pc');
    const defs = definitions_1.defsByPlatform[platform];
    return (0, parse_1.parseKeyGroups)(defs, value);
}
exports.parseHotkeys = parseHotkeys;
