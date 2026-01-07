export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    input: Input;
}

export interface Input {
    transactionVisibility: string;
}

