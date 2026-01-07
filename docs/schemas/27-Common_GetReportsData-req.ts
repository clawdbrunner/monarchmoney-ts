export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    includeCategory:      boolean;
    includeCategoryGroup: boolean;
    includeMerchant:      boolean;
    fillEmptyValues:      boolean;
    filters:              Filters;
    groupBy:              string[];
    sortBy:               string;
}

export interface Filters {
    categoryType:          string;
    transactionVisibility: string;
}

