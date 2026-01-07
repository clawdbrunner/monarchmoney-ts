export interface ResponseBody {
    data: Data;
}

export interface Data {
    aggregatedRecurringItems: AggregatedRecurringItems;
}

export interface AggregatedRecurringItems {
    groups:            Group[];
    aggregatedSummary: AggregatedSummary;
    __typename:        string;
}

export interface AggregatedSummary {
    expense:    AggregatedSummaryCreditCard;
    creditCard: AggregatedSummaryCreditCard;
    income:     Income;
    __typename: string;
}

export interface AggregatedSummaryCreditCard {
    completed:          number;
    remaining:          number;
    total:              number;
    count:              number;
    pendingAmountCount: number;
    __typename:         string;
}

export interface Income {
    completed:  number;
    remaining:  number;
    total:      number;
    __typename: string;
}

export interface Group {
    groupBy:    GroupBy;
    results:    Result[];
    summary:    Summary;
    __typename: string;
}

export interface GroupBy {
    status:     string;
    __typename: string;
}

export interface Result {
    stream:                           Stream;
    date:                             Date;
    isPast:                           boolean;
    isLate:                           boolean;
    markedPaidAt:                     null;
    isCompleted:                      boolean;
    transactionId:                    null | string;
    amount:                           number;
    amountDiff:                       number | null;
    isAmountDifferentThanOriginal:    null;
    creditReportLiabilityStatementId: null;
    category:                         Category | null;
    account:                          Account | null;
    liabilityStatement:               null;
    __typename:                       ResultTypename;
}

export enum ResultTypename {
    RecurringTransactionCalendarItem = "RecurringTransactionCalendarItem",
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
}

export interface Category {
    id:         string;
    name:       string;
    icon?:      string;
    __typename: CategoryTypename;
    logoUrl?:   null | string;
}

export enum CategoryTypename {
    Category = "Category",
    Merchant = "Merchant",
}

export interface Stream {
    id:                           string;
    frequency:                    Frequency;
    isActive:                     boolean;
    amount:                       number;
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

export interface Summary {
    expense:    IncomeClass;
    creditCard: IncomeClass;
    income:     IncomeClass;
    __typename: string;
}

export interface IncomeClass {
    total:      number;
    __typename: string;
}

