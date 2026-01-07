export interface ResponseBody {
    data: Data;
}

export interface Data {
    snapshotsByAccountType: SnapshotsByAccountType[];
    accountTypes:           AccountTypeElement[];
}

export interface AccountTypeElement {
    name:       string;
    group:      Group;
    __typename: AccountTypeTypename;
}

export enum AccountTypeTypename {
    AccountType = "AccountType",
}

export enum Group {
    Asset = "asset",
    Liability = "liability",
    Other = "other",
}

export interface SnapshotsByAccountType {
    accountType: AccountTypeEnum;
    month:       string;
    balance:     number;
    __typename:  SnapshotsByAccountTypeTypename;
}

export enum SnapshotsByAccountTypeTypename {
    SnapshotByType = "SnapshotByType",
}

export enum AccountTypeEnum {
    Brokerage = "brokerage",
    Credit = "credit",
    Depository = "depository",
    RealEstate = "real_estate",
    Vehicle = "vehicle",
}

