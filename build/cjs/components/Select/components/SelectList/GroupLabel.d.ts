import React from 'react';
import type { GroupTitleItem } from '../../utils';
type GroupLabelProps = {
    option: GroupTitleItem;
    renderOptionGroup?: (option: GroupTitleItem) => React.ReactElement;
};
export declare const GroupLabel: ({ option, renderOptionGroup }: GroupLabelProps) => React.JSX.Element;
export {};
