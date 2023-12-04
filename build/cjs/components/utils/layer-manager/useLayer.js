"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLayer = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const LayerManager_1 = require("./LayerManager");
function useLayer({ open, disableEscapeKeyDown, disableOutsideClick, onEscapeKeyDown, onEnterKeyDown, onOutsideClick, onClose, contentRefs, enabled = true, type, }) {
    const layerConfigRef = react_1.default.useRef({
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onEnterKeyDown,
        onOutsideClick,
        onClose,
        contentRefs,
        type,
    });
    react_1.default.useEffect(() => {
        Object.assign(layerConfigRef.current, {
            disableEscapeKeyDown,
            disableOutsideClick,
            onEscapeKeyDown,
            onEnterKeyDown,
            onOutsideClick,
            onClose,
            contentRefs,
            enabled,
        });
    }, [
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onEnterKeyDown,
        onOutsideClick,
        onClose,
        contentRefs,
        enabled,
    ]);
    react_1.default.useEffect(() => {
        if (open && enabled) {
            const layerConfig = layerConfigRef.current;
            LayerManager_1.layerManager.add(layerConfig);
            return () => {
                LayerManager_1.layerManager.remove(layerConfig);
            };
        }
        return undefined;
    }, [open, enabled]);
}
exports.useLayer = useLayer;
