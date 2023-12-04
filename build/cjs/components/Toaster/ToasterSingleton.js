"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToasterSingleton = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const get_1 = tslib_1.__importDefault(require("lodash/get"));
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
const cn_1 = require("../utils/cn");
const ToasterProvider_1 = require("./Provider/ToasterProvider");
const ToasterComponent_1 = require("./ToasterComponent/ToasterComponent");
const TOASTER_KEY = Symbol('Toaster instance key');
const bToaster = (0, cn_1.block)('toaster');
let ReactDOMClient;
class ToasterSingleton {
    static injectReactDOMClient(client) {
        ReactDOMClient = client;
    }
    constructor(args) {
        this.className = '';
        this.mobile = false;
        this.componentAPI = null;
        this.add = (options) => {
            var _a;
            (_a = this.componentAPI) === null || _a === void 0 ? void 0 : _a.add(options);
        };
        this.remove = (name) => {
            var _a;
            (_a = this.componentAPI) === null || _a === void 0 ? void 0 : _a.remove(name);
        };
        this.removeAll = () => {
            var _a;
            (_a = this.componentAPI) === null || _a === void 0 ? void 0 : _a.removeAll();
        };
        this.update = (name, overrideOptions) => {
            var _a;
            (_a = this.componentAPI) === null || _a === void 0 ? void 0 : _a.update(name, overrideOptions);
        };
        this.has = (name) => {
            var _a, _b;
            return (_b = (_a = this.componentAPI) === null || _a === void 0 ? void 0 : _a.has(name)) !== null && _b !== void 0 ? _b : false;
        };
        const className = (0, get_1.default)(args, ['className'], '');
        const mobile = (0, get_1.default)(args, ['mobile'], false);
        if (window[TOASTER_KEY] instanceof ToasterSingleton) {
            const me = window[TOASTER_KEY];
            me.className = className;
            me.mobile = mobile;
            me.setRootNodeClassName();
            return me;
        }
        this.className = className;
        this.mobile = mobile;
        this.createRootNode();
        this.createReactRoot();
        this.render();
        window[TOASTER_KEY] = this;
    }
    destroy() {
        react_dom_1.default.unmountComponentAtNode(this.rootNode);
        document.body.removeChild(this.rootNode);
    }
    createRootNode() {
        this.rootNode = document.createElement('div');
        this.setRootNodeClassName();
        document.body.appendChild(this.rootNode);
    }
    createReactRoot() {
        if (ReactDOMClient) {
            this.reactRoot = ReactDOMClient.createRoot(this.rootNode);
        }
    }
    render() {
        const container = (react_1.default.createElement(ToasterProvider_1.ToasterProvider, { ref: (api) => {
                this.componentAPI = api;
            } },
            react_1.default.createElement(ToasterComponent_1.ToasterComponent, { hasPortal: false, mobile: this.mobile })));
        if (this.reactRoot) {
            this.reactRoot.render(container);
        }
        else {
            react_dom_1.default.render(container, this.rootNode, () => Promise.resolve());
        }
    }
    setRootNodeClassName() {
        this.rootNode.className = bToaster({ mobile: this.mobile }, this.className);
    }
}
exports.ToasterSingleton = ToasterSingleton;