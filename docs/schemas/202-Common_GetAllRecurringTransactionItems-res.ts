export interface ResponseBody {
    data: Data;
}

export interface Data {
    recurringTransactionStreams: RecurringTransactionStream[];
}

export interface RecurringTransactionStream {
    stream:                    Stream;
    nextForecastedTransaction: NextForecastedTransaction;
    category:                  Category | null;
    account:                   Account | null;
    __typename:                RecurringTransactionStreamTypename;
}

export enum RecurringTransactionStreamTypename {
    RecurringTransactionItem = "RecurringTransactionItem",
}

export interface Account {
    id:          string;
    displayName: string;
    icon:        Icon;
    logoUrl:     null | string;
    __typename:  AccountTypename;
}

export enum AccountTypename {
    Account = "Account",
}

export enum Icon {
    CreditCard = "credit-card",
    DollarSign = "dollar-sign",
    Home = "home",
}

export interface Category {
    id:         string;
    name:       string;
    icon?:      string;
    __typename: CategoryTypename;
}

export enum CategoryTypename {
    Category = "Category",
    Merchant = "Merchant",
}

export interface NextForecastedTransaction {
    date:       Date;
    amount:     number;
    __typename: NextForecastedTransactionTypename;
}

export enum NextForecastedTransactionTypename {
    RecurringTransactionNextForecastedTransaction = "RecurringTransactionNextForecastedTransaction",
}

export interface Stream {
    id:                           string;
    frequency:                    Frequency;
    isActive:                     boolean;
    isApproximate:                boolean;
    name:                         string;
    logoUrl:                      null | string;
    merchant:                     Category;
    creditReportLiabilityAccount: null;
    __typename:                   StreamTypename;
}

export enum StreamTypename {
    RecurringTransactionStream = "RecurringTransactionStream",
}

export enum Frequency {
    Biweekly = "biweekly",
    Monthly = "monthly",
    Quarterly = "quarterly",
    Weekly = "weekly",
    Yearly = "yearly",
}

