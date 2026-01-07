export interface ResponseBody {
    data: Data;
}

export interface Data {
    portfolio: Portfolio;
}

export interface Portfolio {
    allocationSimple: AllocationSimple[];
    performance:      Performance;
    __typename:       string;
}

export interface AllocationSimple {
    type:              string;
    typeDisplay:       string;
    allocationPercent: number;
    totalValue:        number;
    __typename:        string;
}

export interface Performance {
    totalValue: number;
    __typename: string;
}

