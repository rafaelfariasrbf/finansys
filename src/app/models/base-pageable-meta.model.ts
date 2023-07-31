export interface BasePageableMetaModel {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: any[];
    search: string;
    searchBy?: any[];
}
