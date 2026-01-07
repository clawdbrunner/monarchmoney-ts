export interface ResponseBody {
    data: Data;
}

export interface Data {
    accounts: Account[];
}

export interface Account {
    id:                              string;
    createdAt:                       Date;
    displayName:                     string;
    displayBalance:                  number;
    displayLastUpdatedAt:            Date;
    dataProvider:                    string;
    icon:                            Icon;
    logoUrl:                         null | string;
    order:                           number;
    isAsset:                         boolean;
    includeBalanceInNetWorth:        boolean;
    deactivatedAt:                   null;
    manualInvestmentsTrackingMethod: null | string;
    isManual:                        boolean;
    syncDisabled:                    boolean;
    type:                            Type;
    credential:                      Credential | null;
    institution:                     Institution | null;
    ownedByUser:                     null;
    __typename:                      AccountTypename;
}

export enum AccountTypename {
    Account = "Account",
}

export interface Credential {
    updateRequired: boolean;
    syncDisabledAt: null;
    __typename:     CredentialTypename;
}

export enum CredentialTypename {
    Credential = "Credential",
}

export enum Icon {
    Car = "car",
    CreditCard = "credit-card",
    DollarSign = "dollar-sign",
    FileText = "file-text",
    Home = "home",
    TrendingUp = "trending-up",
}

export interface Institution {
    status:                 Status | null;
    newConnectionsDisabled: boolean;
    __typename:             InstitutionTypename;
}

export enum InstitutionTypename {
    Institution = "Institution",
}

export enum Status {
    Degraded = "DEGRADED",
    Down = "DOWN",
    Healthy = "HEALTHY",
}

export interface Type {
    display:    Display;
    name:       Name;
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

export enum Name {
    Brokerage = "brokerage",
    Credit = "credit",
    Depository = "depository",
    Loan = "loan",
    RealEstate = "real_estate",
    Vehicle = "vehicle",
}

