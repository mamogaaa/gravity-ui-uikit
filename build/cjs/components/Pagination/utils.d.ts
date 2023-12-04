export declare function getNumerationList({ page, numberOfPages, mobile, }: {
    page: number;
    numberOfPages: number;
    mobile: boolean;
}): (number | "pageOf")[] | (number | "ellipsis")[];
export declare function getNumberOfPages(pageSize: number, total?: number): number;
