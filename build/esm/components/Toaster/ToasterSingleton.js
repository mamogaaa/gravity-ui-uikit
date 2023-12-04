import React from 'react';
import get from 'lodash/get';
import ReactDOM from 'react-dom';
import { block } from '../utils/cn';
import { ToasterProvider } from './Provider/ToasterProvider';
import { ToasterComponent } from './ToasterComponent/ToasterComponent';
const TOASTER_KEY = Symbol('Toaster instance key');
const bToaster = block('toaster');
let ReactDOMClient;
export class ToasterSingleton {
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
        const className = get(args, ['className'], '');
        const mobile = get(args, ['mobile'], false);
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
        ReactDOM.unmountComponentAtNode(this.rootNode);
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
        const container = (React.createElement(ToasterProvider, { ref: (api) => {
                this.componentAPI = api;
            } },
            React.createElement(ToasterComponent, { hasPortal: false, mobile: this.mobile })));
        if (this.reactRoot) {
            this.reactRoot.render(container);
        }
        else {
            ReactDOM.render(container, this.rootNode, () => Promise.resolve());
        }
    }
    setRootNodeClassName() {
        this.rootNode.className = bToaster({ mobile: this.mobile }, this.className);
    }
}
