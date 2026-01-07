export interface ResponseBody {
    data: Data;
}

export interface Data {
    categoryGroups:           CategoryGroup[];
    goalsV2:                  GoalsV2[];
    savingsGoals:             any[];
    merchants:                Merchant[];
    accounts:                 Account[];
    householdTransactionTags: CategoryGroup[];
    myHousehold:              MyHousehold;
    householdPreferences:     HouseholdPreferences;
}

export interface Account {
    id:          string;
    displayName: string;
    logoUrl:     null | string;
    icon:        Icon;
    type:        Type;
    __typename:  AccountTypename;
}

export enum AccountTypename {
    Account = "Account",
}

export enum Icon {
    Car = "car",
    CreditCard = "credit-card",
    DollarSign = "dollar-sign",
    FileText = "file-text",
    Home = "home",
    TrendingUp = "trending-up",
}

export interface Type {
    name:       Name;
    display:    AccountGroupOrder;
    __typename: TypeTypename;
}

export enum TypeTypename {
    AccountType = "AccountType",
}

export enum AccountGroupOrder {
    Cash = "Cash",
    CreditCards = "Credit Cards",
    Investments = "Investments",
    Loans = "Loans",
    RealEstate = "Real Estate",
    Vehicles = "Vehicles",
}

export enum Name {
    Brokerage = "brokerage",
    Credit = "credit",
    Depository = "depository",
    Loan = "loan",
    RealEstate = "real_estate",
    Vehicle = "vehicle",
}

export interface CategoryGroup {
    id:          string;
    name:        string;
    order:       number;
    categories?: CategoryGroup[];
    __typename:  CategoryGroupTypename;
    icon?:       string;
    color?:      string;
}

export enum CategoryGroupTypename {
    Category = "Category",
    CategoryGroup = "CategoryGroup",
    TransactionTag = "TransactionTag",
}

export interface GoalsV2 {
    id:                     string;
    name:                   string;
    imageStorageProvider:   string;
    imageStorageProviderId: string;
    archivedAt:             null;
    priority:               number;
    __typename:             string;
}

export interface HouseholdPreferences {
    accountGroupOrder:         AccountGroupOrder[];
    collaborationToolsEnabled: boolean;
    __typename:                string;
}

export interface Merchant {
    id:               string;
    name:             string;
    transactionCount: number;
    logoUrl:          null | string;
    __typename:       MerchantTypename;
}

export enum MerchantTypename {
    Merchant = "Merchant",
}

export interface MyHousehold {
    id:         string;
    users:      User[];
    __typename: string;
}

export interface User {
    id:                string;
    name:              string;
    displayName:       string;
    profilePictureUrl: null;
    __typename:        string;
}

