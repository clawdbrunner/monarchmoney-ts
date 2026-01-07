export interface ResponseBody {
    data: Data;
}

export interface Data {
    accounts: Account[];
}

export interface Account {
    id:                string;
    recentBalances:    number[];
    type:              Type;
    includeInNetWorth: boolean;
    __typename:        AccountTypename;
}

export enum AccountTypename {
    Account = "Account",
}

export interface Type {
    name:       Name;
    display:    Display;
    group:      Group;
    __typename: TypeTypename;
}

export enum TypeTypename {
    AccountType = "AccountType",
}

export enum Display {
    Cash = "Cash",
    CreditCards = "Credit Cards",
    Investments = "Investments",
    Loans = "Loans",
    RealEstate = "Real Estate",
    Vehicles = "Vehicles",
}

export enum Group {
    Asset = "asset",
    Liability = "liability",
}

export enum Name {
    Brokerage = "brokerage",
    Credit = "credit",
    Depository = "depository",
    Loan = "loan",
    RealEstate = "real_estate",
    Vehicle = "vehicle",
}

