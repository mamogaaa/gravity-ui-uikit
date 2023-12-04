import uniq from 'lodash/uniq';
export function getNumerationList({ page, numberOfPages, mobile, }) {
    return mobile
        ? getMobileNumerationList(page, numberOfPages)
        : getDesktopNumerationList(page, numberOfPages);
}
function getMobileNumerationList(page, numberOfPages) {
    const list = [page, 'pageOf', numberOfPages];
    return list;
}
function getDesktopNumerationList(page, numberOfPages) {
    const prevPage = Math.max(page - 1, 1);
    let rightPage = Math.min(page + 1, numberOfPages);
    const list = [prevPage, page, rightPage];
    if (page === 1) {
        rightPage = Math.min(rightPage + 1, numberOfPages);
        list.push(rightPage);
    }
    if (numberOfPages - rightPage >= 2) {
        list.push('ellipsis');
    }
    if (numberOfPages - page === 1) {
        list.unshift(Math.max(page - 2, 1));
    }
    if (page === numberOfPages) {
        list.unshift(Math.max(page - 2, 1));
        list.unshift(Math.max(page - 3, 1));
    }
    list.push(numberOfPages);
    return uniq(list);
}
export function getNumberOfPages(pageSize, total = 0) {
    return Math.floor((total - 1) / pageSize) + 1;
}
