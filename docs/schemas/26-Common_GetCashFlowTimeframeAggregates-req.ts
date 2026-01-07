export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    filters: Filters;
}

export interface Filters {
    accounts: any[];
    tags:     any[];
}

