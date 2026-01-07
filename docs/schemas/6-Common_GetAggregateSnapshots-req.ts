export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    filters: Filters;
}

export interface Filters {
    startDate:              Date;
    endDate:                null;
    useAdaptiveGranularity: boolean;
    accountFilters:         AccountFilters;
}

export interface AccountFilters {
    accountType: null;
}

