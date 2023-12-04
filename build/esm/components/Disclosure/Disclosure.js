import React from 'react';
import { isOfType } from '../utils/isOfType';
import { DisclosureProvider } from './DisclosureContext';
import { DisclosureDetails } from './DisclosureDetails/DisclosureDetails';
import { DefaultDisclosureSummary, DisclosureSummary } from './DisclosureSummary/DisclosureSummary';
import { b } from './cn';
import './Disclosure.css';
const isDisclosureSummaryComponent = isOfType(DisclosureSummary);
// @ts-ignore this ts-error is appears when forwarding ref. It complains that DisclosureComposition props is not provided initially
export const Disclosure = React.forwardRef(function Disclosure(props, ref) {
    const { size = 'm', disabled = false, defaultExpanded = false, arrowPosition = 'left', summary = '', className, keepMounted = true, children, onUpdate = () => { }, expanded, qa, } = props;
    const [summaryContent, detailsContent] = prepareChildren(children);
    return (React.createElement(DisclosureProvider, { disabled: disabled, defaultExpanded: defaultExpanded, expanded: expanded, keepMounted: keepMounted, size: size, summary: summary, arrowPosition: arrowPosition, onUpdate: onUpdate },
        React.createElement("section", { ref: ref, className: b({ size }, className), "data-qa": qa },
            summaryContent,
            detailsContent)));
});
function prepareChildren(children) {
    const items = React.Children.toArray(children);
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
        details = React.createElement(DisclosureDetails, null, content);
    }
    if (!summary) {
        summary = (React.createElement(DisclosureSummary, null, (props) => React.createElement(DefaultDisclosureSummary, Object.assign({}, props))));
    }
    return [summary, details];
}
Disclosure.Summary = DisclosureSummary;
Disclosure.displayName = 'Disclosure';
