export interface ResponseBody {
    data: Data;
}

export interface Data {
    recurringMerchantSearch:     null;
    recurringTransactionStreams: RecurringTransactionStream[];
}

export interface RecurringTransactionStream {
    stream:     Stream;
    __typename: RecurringTransactionStreamTypename;
}

export enum RecurringTransactionStreamTypename {
    RecurringTransactionItem = "RecurringTransactionItem",
}

export interface Stream {
    id:         string;
    __typename: StreamTypename;
}

export enum StreamTypename {
    RecurringTransactionStream = "RecurringTransactionStream",
}

