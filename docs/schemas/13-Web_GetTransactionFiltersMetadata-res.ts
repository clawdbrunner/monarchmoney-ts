export interface ResponseBody {
    data: Data;
}

export interface Data {
    transactionFiltersMetadata: TransactionFiltersMetadata;
}

export interface TransactionFiltersMetadata {
    categories:        null;
    categoryGroups:    null;
    accounts:          null;
    merchants:         null;
    tags:              null;
    goals:             null;
    savingsGoals:      null;
    needsReviewByUser: null;
    ownershipSet:      null;
    __typename:        string;
}

