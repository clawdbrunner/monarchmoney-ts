export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    portfolioInput: PortfolioInput;
}

export interface PortfolioInput {
    startDate: Date;
    endDate:   Date;
}

