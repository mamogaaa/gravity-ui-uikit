"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBodyClassName = void 0;
const cn_1 = require("../utils/cn");
const constants_1 = require("./constants");
const b = (0, cn_1.block)(constants_1.ROOT_CLASS_NAME);
const bNew = (0, cn_1.blockNew)(constants_1.ROOT_CLASS_NAME);
const rootClassName = b();
const rootNewClassName = bNew();
const defaultModifiers = {
    'native-scrollbar': false,
};
function updateBodyClassName(newTheme, modifiers, customRootClassName) {
    const bodyEl = document.body;
    if (!bodyEl.classList.contains(rootClassName)) {
        bodyEl.classList.add(rootClassName);
    }
    if (!bodyEl.classList.contains(rootNewClassName)) {
        bodyEl.classList.add(rootNewClassName);
    }
    if (customRootClassName) {
        const parsedCustomRootClassNames = customRootClassName.split(' ');
        parsedCustomRootClassNames.forEach((cls) => {
            if (cls && !bodyEl.classList.contains(cls)) {
                bodyEl.classList.add(cls);
            }
        });
    }
    [...bodyEl.classList].forEach((cls) => {
        if (cls.startsWith((0, cn_1.modsClassName)(b({ theme: true })))) {
            bodyEl.classList.remove(cls);
        }
        if (cls.startsWith((0, cn_1.modsClassName)(bNew({ theme: true })))) {
            bodyEl.classList.remove(cls);
        }
    });
    bodyEl.classList.add((0, cn_1.modsClassName)(b({ theme: newTheme })));
    bodyEl.classList.add((0, cn_1.modsClassName)(bNew({ theme: newTheme })));
    for (const [key, value] of Object.entries(Object.assign(Object.assign({}, defaultModifiers), modifiers))) {
        bodyEl.classList.toggle((0, cn_1.modsClassName)(b({ [key]: true })), value);
        bodyEl.classList.toggle((0, cn_1.modsClassName)(bNew({ [key]: true })), value);
    }
}
exports.updateBodyClassName = updateBodyClassName;
