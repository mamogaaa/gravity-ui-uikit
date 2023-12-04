import React from 'react';
import _range from 'lodash/range';
function getRefs(count) {
    return _range(count).reduce((acc, index) => {
        acc[index] = React.createRef();
        return acc;
    }, {});
}
export class SimpleContainer extends React.Component {
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
        const children = React.Children.map(this.props.children, (child, index) => React.cloneElement(child, { ref: this.state.refsList[index] }));
        return (React.createElement("div", { ref: this.setRef, style: { minWidth, minHeight } }, children));
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
