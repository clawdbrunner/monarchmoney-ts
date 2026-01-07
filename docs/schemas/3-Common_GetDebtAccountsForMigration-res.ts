export interface ResponseBody {
    data: Data;
}

export interface Data {
    accounts: Account[];
}

export interface Account {
    id:                     string;
    displayName:            string;
    displayBalance:         number;
    icon:                   Icon;
    logoUrl:                string;
    includeInNetWorth:      boolean;
    isHidden:               boolean;
    displayLastUpdatedAt:   Date;
    apr:                    null;
    interestRate:           null;
    minimumPayment:         null;
    plannedPayment:         null;
    excludeFromDebtPaydown: boolean;
    type:                   Type;
    subtype:                Type;
    __typename:             AccountTypename;
}

export enum AccountTypename {
    Account = "Account",
}

export enum Icon {
    CreditCard = "credit-card",
}

export interface Type {
    name:       Name;
    display:    Display;
    __typename: SubtypeTypename;
}

export enum SubtypeTypename {
    AccountSubtype = "AccountSubtype",
    AccountType = "AccountType",
}

export enum Display {
    CreditCard = "Credit Card",
    CreditCards = "Credit Cards",
}

export enum Name {
    Credit = "credit",
    CreditCard = "credit_card",
}

