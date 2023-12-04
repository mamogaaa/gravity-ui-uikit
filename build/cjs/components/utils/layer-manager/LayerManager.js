"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayersCount = exports.layerManager = void 0;
const constants_1 = require("../../../constants");
const event_broker_1 = require("../event-broker");
class LayerManager {
    constructor() {
        this.stack = [];
        this.handleDocumentKeyDown = (event) => {
            var _a, _b, _c;
            if (event.code === constants_1.KeyCode.ESCAPE) {
                const topLayer = this.getTopLayer();
                if (!topLayer.disableEscapeKeyDown) {
                    (_a = topLayer.onEscapeKeyDown) === null || _a === void 0 ? void 0 : _a.call(topLayer, event);
                    (_b = topLayer.onClose) === null || _b === void 0 ? void 0 : _b.call(topLayer, event, 'escapeKeyDown');
                }
            }
            if (event.code === 'Enter') {
                const topLayer = this.getTopLayer();
                (_c = topLayer.onEnterKeyDown) === null || _c === void 0 ? void 0 : _c.call(topLayer, event);
            }
        };
        this.handleDocumentClick = (event) => {
            var _a, _b;
            if (this.isToastClick(event)) {
                return;
            }
            let layer;
            let mouseDownTarget = null;
            if (this.mouseDownLayerTarget) {
                layer = this.mouseDownLayerTarget.layer;
                mouseDownTarget = this.mouseDownLayerTarget.target;
                this.mouseDownLayerTarget = undefined;
                if (!this.stack.includes(layer)) {
                    return;
                }
            }
            else {
                layer = this.getTopLayer();
            }
            if (!layer.disableOutsideClick && this.isOutsideClick(layer, event, mouseDownTarget)) {
                (_a = layer.onOutsideClick) === null || _a === void 0 ? void 0 : _a.call(layer, event);
                (_b = layer.onClose) === null || _b === void 0 ? void 0 : _b.call(layer, event, 'outsideClick');
            }
        };
        this.handleDocumentMouseDown = (event) => {
            const layer = this.getTopLayer();
            if (layer) {
                this.mouseDownLayerTarget = { layer, target: event.target };
            }
        };
    }
    add(config) {
        this.stack.push(config);
        if (this.stack.length === 1) {
            this.addListeners();
        }
        this.notifyLayersChange();
    }
    remove(config) {
        const index = this.stack.indexOf(config);
        this.stack.splice(index, 1);
        if (this.stack.length === 0) {
            this.removeListeners();
        }
        this.notifyLayersChange();
    }
    getLayersCount() {
        return this.stack.length;
    }
    getLayers() {
        return this.stack.map(({ type }) => ({ type }));
    }
    addListeners() {
        document.addEventListener('keydown', this.handleDocumentKeyDown);
        document.addEventListener('click', this.handleDocumentClick, true);
        document.addEventListener('mousedown', this.handleDocumentMouseDown, true);
    }
    removeListeners() {
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
        document.removeEventListener('click', this.handleDocumentClick, true);
        document.removeEventListener('mousedown', this.handleDocumentMouseDown, true);
    }
    notifyLayersChange() {
        event_broker_1.eventBroker.publish({
            componentId: 'LayerManager',
            eventId: 'layerschange',
            meta: {
                /**
                 * @deprecated use layers
                 */
                layersCount: this.getLayersCount(),
                layers: this.getLayers(),
            },
        });
    }
    getTopLayer() {
        return this.stack[this.stack.length - 1];
    }
    isOutsideClick(layer, event, mouseDownTarget = null) {
        const contentElements = layer.contentRefs || [];
        const { target } = event;
        const composedPath = typeof event.composedPath === 'function' ? event.composedPath() : [];
        if (contentElements.length > 0) {
            const isClickOnContentElements = contentElements.some((el) => {
                var _a, _b, _c, _d;
                return ((_b = (_a = el === null || el === void 0 ? void 0 : el.current) === null || _a === void 0 ? void 0 : _a.contains) === null || _b === void 0 ? void 0 : _b.call(_a, target)) ||
                    ((_d = (_c = el === null || el === void 0 ? void 0 : el.current) === null || _c === void 0 ? void 0 : _c.contains) === null || _d === void 0 ? void 0 : _d.call(_c, mouseDownTarget)) ||
                    composedPath.includes(el === null || el === void 0 ? void 0 : el.current);
            });
            return !isClickOnContentElements;
        }
        return false;
    }
    isToastClick(event) {
        const composedPath = typeof event.composedPath === 'function' ? event.composedPath() : [];
        return composedPath.some((el) => {
            var _a;
            return Boolean((_a = el === null || el === void 0 ? void 0 : el.dataset) === null || _a === void 0 ? void 0 : _a.toast);
        });
    }
}
exports.layerManager = new LayerManager();
const getLayersCount = () => {
    return exports.layerManager.getLayersCount();
};
exports.getLayersCount = getLayersCount;
