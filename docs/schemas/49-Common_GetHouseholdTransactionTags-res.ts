export interface ResponseBody {
    data: Data;
}

export interface Data {
    householdTransactionTags: HouseholdTransactionTag[];
}

export interface HouseholdTransactionTag {
    id:         string;
    name:       string;
    color:      string;
    order:      number;
    __typename: Typename;
}

export enum Typename {
    TransactionTag = "TransactionTag",
}

