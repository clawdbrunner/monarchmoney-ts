export interface ResponseBody {
    data: Data;
}

export interface Data {
    aggregates: Aggregate[];
}

export interface Aggregate {
    summary:    Summary;
    __typename: string;
}

export interface Summary {
    avg:        number;
    max:        number;
    maxExpense: number;
    sum:        number;
    sumIncome:  number;
    sumExpense: number;
    first:      Date;
    last:       Date;
    __typename: string;
}

