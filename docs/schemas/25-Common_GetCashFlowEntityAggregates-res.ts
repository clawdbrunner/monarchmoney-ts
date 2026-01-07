export interface ResponseBody {
    data: Data;
}

export interface Data {
    byCategory:      ByCategory[];
    byCategoryGroup: ByCategoryGroup[];
    byMerchant:      ByMerchant[];
    summary:         SummaryElement[];
}

export interface ByCategory {
    groupBy:    ByCategoryGroupBy;
    summary:    ByCategorySummary;
    __typename: ByCategoryTypename;
}

export enum ByCategoryTypename {
    AggregateData = "AggregateData",
}

export interface ByCategoryGroupBy {
    category:   Category;
    __typename: GroupByTypename;
}

export enum GroupByTypename {
    AggregateGroupBy = "AggregateGroupBy",
}

export interface Category {
    id:         string;
    name:       string;
    icon:       string;
    group:      CategoryGroup;
    __typename: CategoryTypename;
}

export enum CategoryTypename {
    Category = "Category",
}

export interface CategoryGroup {
    id:         string;
    type?:      Type;
    __typename: CategoryGroupTypename;
    name?:      string;
    logoUrl?:   null | string;
}

export enum CategoryGroupTypename {
    CategoryGroup = "CategoryGroup",
    Merchant = "Merchant",
}

export enum Type {
    Expense = "expense",
    Income = "income",
    Transfer = "transfer",
}

export interface ByCategorySummary {
    sum:        number;
    __typename: PurpleTypename;
}

export enum PurpleTypename {
    TransactionsSummary = "TransactionsSummary",
}

export interface ByCategoryGroup {
    groupBy:    ByCategoryGroupGroupBy;
    summary:    ByCategorySummary;
    __typename: ByCategoryTypename;
}

export interface ByCategoryGroupGroupBy {
    categoryGroup: CategoryGroup;
    __typename:    GroupByTypename;
}

export interface ByMerchant {
    groupBy:    ByMerchantGroupBy;
    summary:    ByMerchantSummary;
    __typename: ByCategoryTypename;
}

export interface ByMerchantGroupBy {
    merchant:   CategoryGroup;
    __typename: GroupByTypename;
}

export interface ByMerchantSummary {
    sumIncome:  number;
    sumExpense: number;
    __typename: PurpleTypename;
}

export interface SummaryElement {
    summary:    SummarySummary;
    __typename: ByCategoryTypename;
}

export interface SummarySummary {
    sumIncome:   number;
    sumExpense:  number;
    savings:     number;
    savingsRate: number;
    __typename:  PurpleTypename;
}

