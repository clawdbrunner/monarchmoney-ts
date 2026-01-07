export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    offset:  number;
    limit:   number;
    orderBy: string;
    search:  string;
}

