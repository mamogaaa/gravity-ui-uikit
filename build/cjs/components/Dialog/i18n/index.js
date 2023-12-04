"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const addComponentKeysets_1 = require("../../utils/addComponentKeysets");
const en_json_1 = tslib_1.__importDefault(require("./en.json"));
const ru_json_1 = tslib_1.__importDefault(require("./ru.json"));
const COMPONENT = 'Dialog';
exports.default = (0, addComponentKeysets_1.addComponentKeysets)({ en: en_json_1.default, ru: ru_json_1.default }, COMPONENT);
