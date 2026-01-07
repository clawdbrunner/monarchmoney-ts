export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    porfolioInput: PorfolioInput;
}

export interface PorfolioInput {
}

