"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIcon = exports.getUniqId = void 0;
const Icon_1 = require("../Icon");
const cn_1 = require("./cn");
const isOfType_1 = require("./isOfType");
let nextUniqueId = 1;
function getUniqId() {
    return `${cn_1.NAMESPACE}uniq-${nextUniqueId++}`;
}
exports.getUniqId = getUniqId;
exports.isIcon = (0, isOfType_1.isOfType)(Icon_1.Icon);
