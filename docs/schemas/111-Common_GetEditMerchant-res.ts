export interface ResponseBody {
    data: Data;
}

export interface Data {
    merchant: Merchant;
}

export interface Merchant {
    id:                         string;
    name:                       string;
    logoUrl:                    null;
    transactionCount:           number;
    ruleCount:                  number;
    canBeDeleted:               boolean;
    hasActiveRecurringStreams:  boolean;
    recurringTransactionStream: null;
    __typename:                 string;
}

