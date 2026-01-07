export interface ResponseBody {
    data: Data;
}

export interface Data {
    getTransaction: GetTransaction;
    myHousehold:    MyHousehold;
}

export interface GetTransaction {
    id:                      string;
    amount:                  number;
    pending:                 boolean;
    isRecurring:             boolean;
    date:                    Date;
    originalDate:            Date;
    hideFromReports:         boolean;
    needsReview:             boolean;
    reviewedAt:              null;
    reviewedByUser:          null;
    plaidName:               string;
    notes:                   null;
    hasSplitTransactions:    boolean;
    isSplitTransaction:      boolean;
    isManual:                boolean;
    updatedByRetailSync:     boolean;
    splitTransactions:       any[];
    originalTransaction:     null;
    attachments:             any[];
    account:                 Account;
    category:                Category;
    goal:                    null;
    savingsGoalEvent:        null;
    merchant:                Merchant;
    tags:                    any[];
    needsReviewByUser:       null;
    ownedByUser:             null;
    ownershipOverriddenAt:   null;
    hiddenByAccount:         boolean;
    reviewStatus:            null;
    dataProviderDescription: string;
    __typename:              string;
}

export interface Account {
    id:                          string;
    hideTransactionsFromReports: boolean;
    ownedByUser:                 null;
    displayName:                 string;
    icon:                        string;
    logoUrl:                     string;
    __typename:                  string;
}

export interface Category {
    id:         string;
    __typename: string;
    name:       string;
    icon:       string;
    group:      Group;
}

export interface Group {
    id:         string;
    type:       string;
    __typename: string;
}

export interface Merchant {
    id:                         string;
    name:                       string;
    transactionCount:           number;
    logoUrl:                    null;
    hasActiveRecurringStreams:  boolean;
    recurringTransactionStream: null;
    __typename:                 string;
    transactionsCount:          number;
}

export interface MyHousehold {
    id:         string;
    users:      User[];
    __typename: string;
}

export interface User {
    id:                string;
    displayName:       string;
    profilePictureUrl: null;
    __typename:        string;
}

