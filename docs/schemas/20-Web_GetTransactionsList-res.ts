export interface ResponseBody {
    data: Data;
}

export interface Data {
    allTransactions:  AllTransactions;
    transactionRules: TransactionRule[];
}

export interface AllTransactions {
    totalCount:           number;
    totalSelectableCount: number;
    results:              Result[];
    __typename:           string;
}

export interface Result {
    id:                      string;
    amount:                  number;
    pending:                 boolean;
    date:                    Date;
    hideFromReports:         boolean;
    hiddenByAccount:         boolean;
    plaidName:               string;
    notes:                   null | string;
    isRecurring:             boolean;
    reviewStatus:            null | string;
    needsReview:             boolean;
    isSplitTransaction:      boolean;
    dataProviderDescription: string;
    attachments:             any[];
    goal:                    null;
    savingsGoalEvent:        null;
    category:                Category;
    merchant:                Merchant;
    tags:                    any[];
    account:                 Account;
    ownedByUser:             null;
    __typename:              ResultTypename;
}

export enum ResultTypename {
    Transaction = "Transaction",
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
    icon:       string;
    group:      Group;
    __typename: CategoryTypename;
}

export enum CategoryTypename {
    Category = "Category",
}

export interface Group {
    id:         string;
    type:       Type;
    __typename: GroupTypename;
}

export enum GroupTypename {
    CategoryGroup = "CategoryGroup",
}

export enum Type {
    Expense = "expense",
    Income = "income",
    Transfer = "transfer",
}

export interface Merchant {
    name:                       string;
    id:                         string;
    transactionsCount:          number;
    logoUrl:                    null | string;
    recurringTransactionStream: RecurringTransactionStream | null;
    __typename:                 MerchantTypename;
}

export enum MerchantTypename {
    Merchant = "Merchant",
}

export interface RecurringTransactionStream {
    frequency:  string;
    isActive:   boolean;
    __typename: string;
}

export interface TransactionRule {
    id:         string;
    __typename: TransactionRuleTypename;
}

export enum TransactionRuleTypename {
    TransactionRuleV2 = "TransactionRuleV2",
}

