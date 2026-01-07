export interface ResponseBody {
    data: Data;
}

export interface Data {
    budgetSystem:                    string;
    budgetData:                      BudgetData;
    categoryGroups:                  CategoryGroup[];
    goalsV2:                         GoalsV2[];
    savingsGoalMonthlyBudgetAmounts: any[];
}

export interface BudgetData {
    monthlyAmountsByCategory:      MonthlyAmountsByCategory[];
    monthlyAmountsByCategoryGroup: MonthlyAmountsByCategoryGroup[];
    monthlyAmountsForFlexExpense:  MonthlyAmountsForFlexExpense;
    totalsByMonth:                 TotalsByMonth[];
    __typename:                    string;
}

export interface MonthlyAmountsByCategory {
    category:       CategoryGroupClass;
    monthlyAmounts: MonthlyAmount[];
    __typename:     MonthlyAmountsByCategoryTypename;
}

export enum MonthlyAmountsByCategoryTypename {
    BudgetCategoryMonthlyAmounts = "BudgetCategoryMonthlyAmounts",
}

export interface CategoryGroupClass {
    id:         string;
    __typename: CategoryTypename;
}

export enum CategoryTypename {
    Category = "Category",
    CategoryGroup = "CategoryGroup",
}

export interface MonthlyAmount {
    month:                       Date;
    plannedCashFlowAmount:       number;
    plannedSetAsideAmount:       number | null;
    actualAmount:                number;
    remainingAmount:             number;
    previousMonthRolloverAmount: number | null;
    rolloverType:                null;
    cumulativeActualAmount:      number;
    rolloverTargetAmount:        null;
    __typename:                  MonthlyAmountTypename;
}

export enum MonthlyAmountTypename {
    BudgetMonthlyAmounts = "BudgetMonthlyAmounts",
}

export interface MonthlyAmountsByCategoryGroup {
    categoryGroup:  CategoryGroupClass;
    monthlyAmounts: MonthlyAmount[];
    __typename:     MonthlyAmountsByCategoryGroupTypename;
}

export enum MonthlyAmountsByCategoryGroupTypename {
    BudgetCategoryGroupMonthlyAmounts = "BudgetCategoryGroupMonthlyAmounts",
}

export interface MonthlyAmountsForFlexExpense {
    budgetVariability: string;
    monthlyAmounts:    MonthlyAmount[];
    __typename:        string;
}

export interface TotalsByMonth {
    month:                   Date;
    totalIncome:             Total;
    totalExpenses:           Total;
    totalFixedExpenses:      Total;
    totalNonMonthlyExpenses: Total;
    totalFlexibleExpenses:   Total;
    __typename:              string;
}

export interface Total {
    actualAmount:                number;
    plannedAmount:               number;
    previousMonthRolloverAmount: number;
    remainingAmount:             number;
    __typename:                  TotalExpensesTypename;
}

export enum TotalExpensesTypename {
    BudgetTotals = "BudgetTotals",
}

export interface CategoryGroup {
    id:                         string;
    name:                       string;
    order:                      number;
    type:                       Type;
    budgetVariability:          null;
    updatedAt:                  Date;
    groupLevelBudgetingEnabled: boolean;
    categories:                 CategoryElement[];
    rolloverPeriod:             null;
    __typename:                 CategoryTypename;
}

export interface CategoryElement {
    id:                string;
    name:              string;
    icon:              string;
    order:             number;
    budgetVariability: null | string;
    excludeFromBudget: boolean;
    isSystemCategory:  boolean;
    updatedAt:         Date;
    group:             Group;
    rolloverPeriod:    null;
    __typename:        CategoryTypename;
}

export interface Group {
    id:                         string;
    type:                       Type;
    budgetVariability:          null;
    groupLevelBudgetingEnabled: boolean;
    __typename:                 CategoryTypename;
}

export enum Type {
    Expense = "expense",
    Income = "income",
    Transfer = "transfer",
}

export interface GoalsV2 {
    id:                           string;
    name:                         string;
    archivedAt:                   null;
    completedAt:                  null;
    priority:                     number;
    imageStorageProvider:         string;
    imageStorageProviderId:       string;
    plannedContributions:         any[];
    monthlyContributionSummaries: MonthlyContributionSummary[];
    __typename:                   string;
}

export interface MonthlyContributionSummary {
    month:      Date;
    sum:        number;
    __typename: string;
}

