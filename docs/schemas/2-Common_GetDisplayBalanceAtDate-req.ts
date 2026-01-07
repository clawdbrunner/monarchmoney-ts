export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    date:    Date;
    filters: Filters;
}

export interface Filters {
}

