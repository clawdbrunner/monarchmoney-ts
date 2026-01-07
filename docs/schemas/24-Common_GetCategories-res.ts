export interface ResponseBody {
    data: Data;
}

export interface Data {
    categoryGroups: CategoryGroup[];
    categories:     DataCategory[];
}

export interface DataCategory {
    id:                string;
    name:              string;
    order:             number;
    icon:              string;
    isSystemCategory:  boolean;
    excludeFromBudget: boolean;
    budgetVariability: null | string;
    isDisabled:        boolean;
    group:             Group;
    rolloverPeriod:    null;
    __typename:        CategoryTypename;
}

export enum CategoryTypename {
    Category = "Category",
}

export interface Group {
    id:         string;
    type:       Type;
    __typename: GroupTypename;
}

export enum GroupTypename {
    CategoryGroup = "CategoryGroup",
}

export enum Type {
    Expense = "expense",
    Income = "income",
    Transfer = "transfer",
}

export interface CategoryGroup {
    id:                         string;
    name:                       string;
    order:                      number;
    type:                       Type;
    groupLevelBudgetingEnabled: boolean;
    budgetVariability:          null;
    rolloverPeriod:             null;
    categories:                 CategoryGroupCategory[];
    __typename:                 GroupTypename;
}

export interface CategoryGroupCategory {
    id:         string;
    __typename: CategoryTypename;
}

