export interface ResponseBody {
    data: Data;
}

export interface Data {
    allMintTransactions: AllMintTransactions;
}

export interface AllMintTransactions {
    totalCount: number;
    __typename: string;
}

