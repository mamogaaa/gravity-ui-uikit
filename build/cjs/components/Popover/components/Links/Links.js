"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Links = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const Link_1 = require("../../../Link");
const Popover_classname_1 = require("../../Popover.classname");
const Links = ({ links }) => {
    if (links.length === 0) {
        return null;
    }
    return (react_1.default.createElement("div", { className: (0, Popover_classname_1.cnPopover)('tooltip-links') }, links.map((link, index) => {
        const { text, href, target = '_blank', onClick } = link;
        return (react_1.default.createElement(react_1.default.Fragment, { key: `link-${index}` },
            react_1.default.createElement(Link_1.Link, { href: href, target: target, onClick: onClick, className: (0, Popover_classname_1.cnPopover)('tooltip-link') }, text),
            react_1.default.createElement("br", null)));
    })));
};
exports.Links = Links;
