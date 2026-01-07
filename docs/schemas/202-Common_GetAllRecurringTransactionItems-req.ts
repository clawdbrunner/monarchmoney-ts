export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    filters:            Filters;
    includeLiabilities: boolean;
}

export interface Filters {
}

