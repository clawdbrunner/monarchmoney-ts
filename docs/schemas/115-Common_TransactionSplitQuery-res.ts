export interface ResponseBody {
    data: Data;
}

export interface Data {
    getTransaction: GetTransaction;
}

export interface GetTransaction {
    id:                      string;
    amount:                  number;
    reviewedAt:              null;
    needsReview:             boolean;
    reviewStatus:            null;
    hideFromReports:         boolean;
    dataProviderDescription: string;
    notes:                   null;
    category:                Category;
    merchant:                Category;
    needsReviewByUser:       null;
    tags:                    any[];
    ownedByUser:             null;
    goal:                    null;
    account:                 Account;
    __typename:              string;
    splitTransactions:       any[];
}

export interface Account {
    id:              string;
    displayName:     string;
    goalAllocations: any[];
    __typename:      string;
}

export interface Category {
    id:         string;
    name:       string;
    icon?:      string;
    __typename: string;
    logoUrl?:   null;
}

