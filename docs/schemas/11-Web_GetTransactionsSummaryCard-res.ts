export interface ResponseBody {
    data: Data;
}

export interface Data {
    allTransactions: AllTransactions;
}

export interface AllTransactions {
    totalCount: number;
    __typename: string;
}

