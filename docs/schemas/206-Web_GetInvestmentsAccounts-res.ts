export interface ResponseBody {
    data: Data;
}

export interface Data {
    accounts: Account[];
}

export interface Account {
    id:                string;
    displayName:       string;
    isTaxable:         boolean;
    icon:              string;
    order:             number;
    logoUrl:           null | string;
    includeInNetWorth: boolean;
    syncDisabled:      boolean;
    subtype:           Subtype;
    __typename:        string;
}

export interface Subtype {
    display:    string;
    __typename: string;
}

