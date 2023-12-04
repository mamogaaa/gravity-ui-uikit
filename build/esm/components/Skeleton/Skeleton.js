import React from 'react';
import { block } from '../utils/cn';
import './Skeleton.css';
const b = block('skeleton');
export function Skeleton({ className, style }) {
    return React.createElement("div", { className: b(null, className), style: style });
}
