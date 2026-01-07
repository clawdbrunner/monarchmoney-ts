export interface ResponseBody {
    data: Data;
}

export interface Data {
    accounts: Account[];
}

export interface Account {
    id:                string;
    displayBalance:    number;
    includeInNetWorth: boolean;
    type:              Type;
    __typename:        AccountTypename;
}

export enum AccountTypename {
    Account = "Account",
}

export interface Type {
    name:       Name;
    __typename: TypeTypename;
}

export enum TypeTypename {
    AccountType = "AccountType",
}

export enum Name {
    Brokerage = "brokerage",
    Credit = "credit",
    Depository = "depository",
    Loan = "loan",
    RealEstate = "real_estate",
    Vehicle = "vehicle",
}

