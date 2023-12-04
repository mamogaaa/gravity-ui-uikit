"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disclosure = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const isOfType_1 = require("../utils/isOfType");
const DisclosureContext_1 = require("./DisclosureContext");
const DisclosureDetails_1 = require("./DisclosureDetails/DisclosureDetails");
const DisclosureSummary_1 = require("./DisclosureSummary/DisclosureSummary");
const cn_1 = require("./cn");
const isDisclosureSummaryComponent = (0, isOfType_1.isOfType)(DisclosureSummary_1.DisclosureSummary);
// @ts-ignore this ts-error is appears when forwarding ref. It complains that DisclosureComposition props is not provided initially
exports.Disclosure = react_1.default.forwardRef(function Disclosure(props, ref) {
    const { size = 'm', disabled = false, defaultExpanded = false, arrowPosition = 'left', summary = '', className, keepMounted = true, children, onUpdate = () => { }, expanded, qa, } = props;
    const [summaryContent, detailsContent] = prepareChildren(children);
    return (react_1.default.createElement(DisclosureContext_1.DisclosureProvider, { disabled: disabled, defaultExpanded: defaultExpanded, expanded: expanded, keepMounted: keepMounted, size: size, summary: summary, arrowPosition: arrowPosition, onUpdate: onUpdate },
        react_1.default.createElement("section", { ref: ref, className: (0, cn_1.b)({ size }, className), "data-qa": qa },
            summaryContent,
            detailsContent)));
});
function prepareChildren(children) {
    const items = react_1.default.Children.toArray(children);
    let summary, details;
    const content = [];
    for (const item of items) {
        const isDisclosureSummary = isDisclosureSummaryComponent(item);
        if (isDisclosureSummary) {
            if (summary) {
                throw new Error('Only one <Disclosure.Summary> component is allowed');
            }
            summary = item;
            continue;
        }
        content.push(item);
    }
    if (content.length > 0) {
        details = react_1.default.createElement(DisclosureDetails_1.DisclosureDetails, null, content);
    }
    if (!summary) {
        summary = (react_1.default.createElement(DisclosureSummary_1.DisclosureSummary, null, (props) => react_1.default.createElement(DisclosureSummary_1.DefaultDisclosureSummary, Object.assign({}, props))));
    }
    return [summary, details];
}
exports.Disclosure.Summary = DisclosureSummary_1.DisclosureSummary;
exports.Disclosure.displayName = 'Disclosure';
