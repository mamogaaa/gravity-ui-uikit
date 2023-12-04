"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const UserAvatar_1 = require("../UserAvatar");
const cn_1 = require("../utils/cn");
const b = (0, cn_1.block)('user');
function User({ name, description, imgUrl, size = 'm', className }) {
    const compact = size === 'xs';
    return (react_1.default.createElement("div", { className: b({ size }, className) },
        imgUrl && react_1.default.createElement(UserAvatar_1.UserAvatar, { imgUrl: imgUrl, size: size, className: b('avatar') }),
        (name || description) && (react_1.default.createElement("div", { className: b('info') },
            name && react_1.default.createElement("span", { className: b('name') }, name),
            !compact && description && (react_1.default.createElement("span", { className: b('description') }, description))))));
}
exports.User = User;
