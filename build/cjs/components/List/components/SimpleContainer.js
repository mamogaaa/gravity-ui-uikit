"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleContainer = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const range_1 = tslib_1.__importDefault(require("lodash/range"));
function getRefs(count) {
    return (0, range_1.default)(count).reduce((acc, index) => {
        acc[index] = react_1.default.createRef();
        return acc;
    }, {});
}
class SimpleContainer extends react_1.default.Component {
    static getDerivedStateFromProps({ itemCount }, prevState) {
        const refsCount = Object.keys(prevState.refsList).length;
        if (itemCount === refsCount) {
            return prevState;
        }
        else {
            return {
                refsList: getRefs(itemCount),
            };
        }
    }
    constructor(props) {
        super(props);
        this.node = null;
        this.setRef = (node) => {
            var _a;
            this.node = node;
            (_a = this.props.provided) === null || _a === void 0 ? void 0 : _a.innerRef(node);
        };
        this.state = {
            refsList: getRefs(props.itemCount),
        };
    }
    componentDidMount() {
        if (this.node && this.props.sortable) {
            const { width, height } = this.node.getBoundingClientRect();
            this.setState({ minWidth: width, minHeight: height });
        }
    }
    render() {
        const { minWidth, minHeight } = this.state;
        const children = react_1.default.Children.map(this.props.children, (child, index) => react_1.default.cloneElement(child, { ref: this.state.refsList[index] }));
        return (react_1.default.createElement("div", { ref: this.setRef, style: { minWidth, minHeight } }, children));
    }
    scrollToItem(index) {
        var _a, _b;
        const listItem = (_a = this.state.refsList[index]) === null || _a === void 0 ? void 0 : _a.current;
        if (listItem && typeof listItem.getNode === 'function') {
            const node = listItem.getNode();
            if (node) {
                (_b = node.scrollIntoView) === null || _b === void 0 ? void 0 : _b.call(node, { block: 'nearest' });
            }
        }
    }
}
exports.SimpleContainer = SimpleContainer;
