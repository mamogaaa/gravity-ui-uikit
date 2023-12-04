"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toItemList = void 0;
function toItemList(items, separator, path = []) {
    const updatedItems = [];
    let addedGroup = false;
    let index = -1;
    for (const item of items) {
        if (Array.isArray(item)) {
            const groupItemsList = toItemList(item, separator, [...path, index]);
            if (groupItemsList.length === 0) {
                continue;
            }
            if (updatedItems.length !== 0) {
                updatedItems.push(separator);
            }
            for (const groupItem of groupItemsList) {
                groupItem.path[path.length] = ++index;
            }
            updatedItems.push(...groupItemsList);
            addedGroup = true;
        }
        else {
            if (item.hidden) {
                continue;
            }
            if (addedGroup) {
                updatedItems.push(separator);
            }
            const updatedItem = Object.assign({}, item);
            updatedItem.path = [...path, ++index];
            if (item.items) {
                updatedItem.items = toItemList(item.items, separator, updatedItem.path);
            }
            updatedItems.push(updatedItem);
            addedGroup = false;
        }
    }
    return updatedItems;
}
exports.toItemList = toItemList;
