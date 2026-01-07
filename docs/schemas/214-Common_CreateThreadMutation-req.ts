export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    shouldOmitWelcomeMessage: boolean;
    agentType:                string;
}

