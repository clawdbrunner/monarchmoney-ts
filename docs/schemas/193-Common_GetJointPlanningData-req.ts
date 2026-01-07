export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    startDate: Date;
    endDate:   Date;
}

