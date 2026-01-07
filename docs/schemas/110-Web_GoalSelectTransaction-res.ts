export interface ResponseBody {
    data: Data;
}

export interface Data {
    getTransaction: GetTransaction;
}

export interface GetTransaction {
    id:         string;
    account:    Account;
    goal:       null;
    pending:    boolean;
    __typename: string;
}

export interface Account {
    id:              string;
    goalAllocations: any[];
    __typename:      string;
}

