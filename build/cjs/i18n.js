"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18n = void 0;
const i18n_1 = require("@gravity-ui/i18n");
const configure_1 = require("./components/utils/configure");
exports.i18n = new i18n_1.I18N();
exports.i18n.setLang((0, configure_1.getConfig)().lang);
(0, configure_1.subscribeConfigure)((config) => {
    exports.i18n.setLang(config.lang);
});
