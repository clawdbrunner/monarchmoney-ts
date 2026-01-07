import { GraphQLClient } from '../../core/transport/graphql';

export interface BudgetStatus {
  hasBudget: boolean;
  hasTransactions: boolean;
  willCreateBudgetFromEmptyDefaultCategories: boolean;
}

export interface BudgetSettings {
  budgetSystem: string | null;
  budgetApplyToFutureMonthsDefault: unknown;
  flexExpenseRolloverPeriod: unknown;
}

export interface JointPlanningData {
  budgetSystem: string | null;
  budgetData: unknown;
  categoryGroups: unknown[];
  goalsV2: unknown[];
  savingsGoalMonthlyBudgetAmounts: unknown[];
}

export interface GoalV2 {
  id: string;
  name?: string;
  priority?: string;
  archivedAt?: string | null;
  objective?: string | null;
  plannedMonthlyContribution?: number | null;
  plannedMonthlyPretaxContribution?: number | null;
}

export interface SubscriptionDetails {
  id: string;
  paymentSource?: unknown;
  referralCode?: string | null;
  isOnFreeTrial: boolean;
  hasPremiumEntitlement: boolean;
  willCancelAtPeriodEnd: boolean;
  trialEndsAt?: string | null;
  activeSponsorship?: unknown;
}

const COMMON_GET_BUDGET_STATUS = /* GraphQL */ `
  query Common_GetBudgetStatus {
    budgetStatus {
      hasBudget
      hasTransactions
      willCreateBudgetFromEmptyDefaultCategories
      __typename
    }
  }
`;

const COMMON_GET_BUDGET_SETTINGS = /* GraphQL */ `
  query Common_GetBudgetSettings {
    budgetSystem
    budgetApplyToFutureMonthsDefault
    flexExpenseRolloverPeriod
  }
`;

const COMMON_GET_JOINT_PLANNING_DATA = /* GraphQL */ `
  query Common_GetJointPlanningData($startDate: Date, $endDate: Date) {
    budgetSystem
    budgetData {
      monthlyAmountsByCategory {
        category { id __typename }
        monthlyAmounts {
          month
          plannedCashFlowAmount
          plannedSetAsideAmount
          actualAmount
          remainingAmount
          previousMonthRolloverAmount
          rolloverType
          cumulativeActualAmount
          rolloverTargetAmount
          __typename
        }
        __typename
      }
      monthlyAmountsByCategoryGroup {
        categoryGroup { id __typename }
        monthlyAmounts {
          month
          plannedCashFlowAmount
          plannedSetAsideAmount
          actualAmount
          remainingAmount
          previousMonthRolloverAmount
          rolloverType
          cumulativeActualAmount
          rolloverTargetAmount
          __typename
        }
        __typename
      }
      monthlyAmountsForFlexExpense {
        budgetVariability
        monthlyAmounts {
          month
          plannedCashFlowAmount
          plannedSetAsideAmount
          actualAmount
          remainingAmount
          previousMonthRolloverAmount
          rolloverType
          cumulativeActualAmount
          rolloverTargetAmount
          __typename
        }
        __typename
      }
      totalsByMonth {
        month
        totalIncome {
          actualAmount
          plannedAmount
          previousMonthRolloverAmount
          remainingAmount
          __typename
        }
        totalExpenses {
          actualAmount
          plannedAmount
          previousMonthRolloverAmount
          remainingAmount
          __typename
        }
        totalFixedExpenses {
          actualAmount
          plannedAmount
          previousMonthRolloverAmount
          remainingAmount
          __typename
        }
        totalNonMonthlyExpenses {
          actualAmount
          plannedAmount
          previousMonthRolloverAmount
          remainingAmount
          __typename
        }
        totalFlexibleExpenses {
          actualAmount
          plannedAmount
          previousMonthRolloverAmount
          remainingAmount
          __typename
        }
        __typename
      }
      __typename
    }
    categoryGroups {
      id
      name
      order
      type
      budgetVariability
      updatedAt
      groupLevelBudgetingEnabled
      categories {
        id
        name
        icon
        order
        budgetVariability
        excludeFromBudget
        isSystemCategory
        updatedAt
        group {
          id
          type
          budgetVariability
          groupLevelBudgetingEnabled
          __typename
        }
        __typename
      }
      __typename
    }
    goalsV2 {
      id
      name
      archivedAt
      completedAt
      priority
      imageStorageProvider
      imageStorageProviderId
      plannedContributions { id month amount __typename }
      monthlyContributionSummaries { month sum __typename }
      __typename
    }
    savingsGoalMonthlyBudgetAmounts
  }
`;

const WEB_GOALS_V2 = /* GraphQL */ `
  query Web_GoalsV2 {
    goalsV2 {
      id
      imageStorageProvider
      imageStorageProviderId
      priority
      archivedAt
      objective
      plannedMonthlyContribution
      plannedMonthlyPretaxContribution
      sumMonthlyContribution
      sumMonthlyPretaxContribution
      balance
      targetAmount
      targetAmountPretax
      targetDate
      durationInMonths
      requiredMonthlyContribution
      requiredMonthlyPretaxContribution
      monthlyContributionSummaries {
        month
        sum
        sumPretax
        __typename
      }
      monthlyContributionTargets {
        month
        amount
        pretaxAmount
        __typename
      }
      targetMonthlyContribution {
        amount
        pretaxAmount
        __typename
      }
      contributionSeriesUpdatedAt
      status
      coverContributionByDate
      coverByDate
      coverDateByContribution
      riskTolerance
      accountGroupIds
      goalType
      goalTheme
      goalProfileId
      forecastConfidence
      forecastHistoricalVolatility
      assetAllocation
      monthlyContributionOutlook
      monthlyPretaxContributionOutlook
      allocatedAccounts {
        id
        displayName
        type {
          name
          display
          __typename
        }
        __typename
      }
      unallocatedBalance
      hasConvertedContributions
      priorityRanking
      __typename
    }
    accountsWithUnallocatedBalancesForGoals {
      id
      displayName
      accountType
      unallocatedBalance
      totalBalance
      logoUrl
      __typename
    }
  }
`;

const COMMON_GET_SUBSCRIPTION_DETAILS = /* GraphQL */ `
  query Common_GetSubscriptionDetails {
    subscription {
      id
      paymentSource
      referralCode
      isOnFreeTrial
      hasPremiumEntitlement
      willCancelAtPeriodEnd
      trialEndsAt
      activeSponsorship
      __typename
    }
  }
`;

const COMMON_MIGRATED_TO_SAVINGS_GOALS = /* GraphQL */ `
  query Common_MigratedToSavingsGoals {
    migratedToSavingsGoals
  }
`;

export class BudgetsClient {
  constructor(private graphql: GraphQLClient) {}

  async getStatus(): Promise<BudgetStatus> {
    const data = await this.graphql.query<{ budgetStatus: BudgetStatus }>(COMMON_GET_BUDGET_STATUS);
    return data.budgetStatus;
  }

  async getSettings(): Promise<BudgetSettings> {
    const data = await this.graphql.query<BudgetSettings>(COMMON_GET_BUDGET_SETTINGS);
    return data;
  }

  async getJointPlanningData(startDate?: string, endDate?: string): Promise<JointPlanningData> {
    const data = await this.graphql.query<JointPlanningData>(COMMON_GET_JOINT_PLANNING_DATA, { startDate, endDate });
    return data;
  }

  async listGoals(): Promise<GoalV2[]> {
    const data = await this.graphql.query<{ goalsV2: GoalV2[] }>(WEB_GOALS_V2);
    return data.goalsV2;
  }

  async getSubscription(): Promise<SubscriptionDetails> {
    const data = await this.graphql.query<{ subscription: SubscriptionDetails }>(COMMON_GET_SUBSCRIPTION_DETAILS);
    return data.subscription;
  }

  async migratedToSavingsGoals(): Promise<boolean> {
    const data = await this.graphql.query<{ migratedToSavingsGoals: boolean }>(COMMON_MIGRATED_TO_SAVINGS_GOALS);
    return data.migratedToSavingsGoals;
  }
}
