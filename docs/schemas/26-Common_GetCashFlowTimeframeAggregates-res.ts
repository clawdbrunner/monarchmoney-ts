export interface ResponseBody {
    data: Data;
}

export interface Data {
    byYear:    ByYear[];
    byMonth:   ByMonth[];
    byQuarter: ByQuarter[];
}

export interface ByMonth {
    groupBy:    ByMonthGroupBy;
    summary:    Summary;
    __typename: ByMonthTypename;
}

export enum ByMonthTypename {
    AggregateData = "AggregateData",
}

export interface ByMonthGroupBy {
    month:      Date;
    __typename: GroupByTypename;
}

export enum GroupByTypename {
    AggregateGroupBy = "AggregateGroupBy",
}

export interface Summary {
    savings:     number;
    savingsRate: number;
    sumIncome:   number;
    sumExpense:  number;
    __typename:  SummaryTypename;
}

export enum SummaryTypename {
    TransactionsSummary = "TransactionsSummary",
}

export interface ByQuarter {
    groupBy:    ByQuarterGroupBy;
    summary:    Summary;
    __typename: ByMonthTypename;
}

export interface ByQuarterGroupBy {
    quarter:    Date;
    __typename: GroupByTypename;
}

export interface ByYear {
    groupBy:    ByYearGroupBy;
    summary:    Summary;
    __typename: ByMonthTypename;
}

export interface ByYearGroupBy {
    year:       Date;
    __typename: GroupByTypename;
}

