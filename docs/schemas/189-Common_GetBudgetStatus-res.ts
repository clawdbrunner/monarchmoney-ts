export interface ResponseBody {
    data: Data;
}

export interface Data {
    budgetStatus: BudgetStatus;
}

export interface BudgetStatus {
    hasBudget:                                  boolean;
    hasTransactions:                            boolean;
    willCreateBudgetFromEmptyDefaultCategories: boolean;
    __typename:                                 string;
}

