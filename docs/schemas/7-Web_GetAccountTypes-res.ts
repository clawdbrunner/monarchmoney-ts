export interface ResponseBody {
    data: Data;
}

export interface Data {
    accountTypes: AccountType[];
}

export interface AccountType {
    name:                  string;
    display:               string;
    group:                 Group;
    showForSyncedAccounts: boolean;
    possibleSubtypes:      PossibleSubtype[];
    __typename:            AccountTypeTypename;
}

export enum AccountTypeTypename {
    AccountType = "AccountType",
}

export enum Group {
    Asset = "asset",
    Liability = "liability",
    Other = "other",
}

export interface PossibleSubtype {
    display:    string;
    name:       string;
    __typename: PossibleSubtypeTypename;
}

export enum PossibleSubtypeTypename {
    AccountSubtype = "AccountSubtype",
}

