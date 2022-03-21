export interface IPagination {
    count: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
    page: number;
    totalCount: number;
    totalPages: number;
}
