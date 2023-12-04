"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRef = void 0;
function setRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    }
    else if (ref) {
        ref.current = value;
    }
}
exports.setRef = setRef;