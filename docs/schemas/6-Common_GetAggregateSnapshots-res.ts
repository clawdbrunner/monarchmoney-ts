export interface ResponseBody {
    data: Data;
}

export interface Data {
    aggregateSnapshots: AggregateSnapshot[];
}

export interface AggregateSnapshot {
    date:               Date;
    balance:            number;
    assetsBalance:      number;
    liabilitiesBalance: number;
    __typename:         Typename;
}

export enum Typename {
    AggregateSnapshot = "AggregateSnapshot",
}

