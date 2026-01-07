export interface ResponseBody {
    data: Data;
}

export interface Data {
    portfolio: Portfolio;
}

export interface Portfolio {
    performance:       Performance;
    aggregateHoldings: AggregateHoldings;
    __typename:        string;
}

export interface AggregateHoldings {
    edges:      Edge[];
    __typename: string;
}

export interface Edge {
    node:       Node;
    __typename: string;
}

export interface Node {
    id:                         string;
    quantity:                   number;
    basis:                      number;
    totalValue:                 number;
    securityPriceChangeDollars: number | null;
    securityPriceChangePercent: number | null;
    lastSyncedAt:               Date | null;
    holdings:                   Holding[];
    security:                   NodeSecurity;
    __typename:                 string;
}

export interface Holding {
    id:                    string;
    type:                  string;
    typeDisplay:           string;
    name:                  string;
    ticker:                string;
    closingPrice:          number;
    closingPriceUpdatedAt: Date | null;
    quantity:              number;
    value:                 number;
    account:               Account;
    taxLots:               any[];
    __typename:            string;
}

export interface Account {
    id:             string;
    mask:           null | string;
    icon:           string;
    logoUrl:        null | string;
    institution:    Institution | null;
    type:           Type;
    subtype:        Type;
    displayName:    string;
    currentBalance: number;
    __typename:     string;
}

export interface Institution {
    id:         string;
    name:       string;
    __typename: string;
}

export interface Type {
    name:       string;
    display:    string;
    __typename: string;
}

export interface NodeSecurity {
    id:                    string;
    name:                  string;
    ticker:                string;
    currentPrice:          number | null;
    currentPriceUpdatedAt: Date | null;
    closingPrice:          number;
    type:                  string;
    typeDisplay:           string;
    __typename:            string;
}

export interface Performance {
    totalValue:          number;
    totalBasis:          number;
    totalChangePercent:  number;
    totalChangeDollars:  number;
    oneDayChangePercent: number;
    historicalChart:     HistoricalChart[];
    benchmarks:          Benchmark[];
    __typename:          string;
}

export interface Benchmark {
    security:        BenchmarkSecurity;
    historicalChart: HistoricalChart[];
    __typename:      string;
}

export interface HistoricalChart {
    date:          Date;
    returnPercent: number;
    __typename:    Typename;
}

export enum Typename {
    SecurityPerformanceChartDatum = "SecurityPerformanceChartDatum",
}

export interface BenchmarkSecurity {
    id:                  string;
    ticker:              string;
    name:                string;
    oneDayChangePercent: number;
    __typename:          string;
}

