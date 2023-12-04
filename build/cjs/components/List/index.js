"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListWrapper = exports.ListQa = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const List_1 = require("./List");
tslib_1.__exportStar(require("./List"), exports);
tslib_1.__exportStar(require("./types"), exports);
tslib_1.__exportStar(require("./components/ListItem"), exports);
var constants_1 = require("./constants");
Object.defineProperty(exports, "ListQa", { enumerable: true, get: function () { return constants_1.ListQa; } });
/** @deprecated Use `<List/>` */
const ListWrapper = (props) => react_1.default.createElement(List_1.List, Object.assign({}, props));
exports.ListWrapper = ListWrapper;
exports.ListWrapper.defaultProps = List_1.listDefaultProps;
