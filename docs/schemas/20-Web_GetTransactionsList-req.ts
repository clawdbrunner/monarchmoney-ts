export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    orderBy: string;
    limit:   number;
    filters: Filters;
}

export interface Filters {
    transactionVisibility: string;
}

