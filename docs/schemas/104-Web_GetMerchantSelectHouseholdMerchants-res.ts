export interface ResponseBody {
    data: Data;
}

export interface Data {
    merchants: Merchant[];
}

export interface Merchant {
    id:               string;
    name:             string;
    logoUrl:          null | string;
    transactionCount: number;
    __typename:       Typename;
}

export enum Typename {
    Merchant = "Merchant",
}

