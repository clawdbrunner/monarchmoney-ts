import { GraphQLClient } from '../../core/transport/graphql.js';

export interface Category {
  id: string;
  name: string;
  order?: number;
  icon?: string;
  isSystemCategory?: boolean;
  excludeFromBudget?: boolean;
  budgetVariability?: string;
  isDisabled?: boolean;
  group?: { id: string; type?: string };
}

export interface CategoryGroup {
  id: string;
  name: string;
  order?: number;
  type?: string;
  groupLevelBudgetingEnabled?: boolean;
  budgetVariability?: string;
}

const COMMON_GET_CATEGORIES = /* GraphQL */ `
  query Common_GetCategories($includeSystemDisabledCategories: Boolean) {
    categoryGroups {
      id
      name
      order
      type
      groupLevelBudgetingEnabled
      budgetVariability
      rolloverPeriod {
        id
        startMonth
        startingBalance
        frequency
        targetAmount
        type
        __typename
      }
      categories { id __typename }
      __typename
    }
    categories(includeDisabledSystemCategories: $includeSystemDisabledCategories) {
      id
      name
      order
      icon
      isSystemCategory
      excludeFromBudget
      budgetVariability
      isDisabled
      group { id type __typename }
      rolloverPeriod {
        id
        startMonth
        startingBalance
        frequency
        targetAmount
        type
        __typename
      }
      __typename
    }
  }
`;

export class CategoriesClient {
  constructor(private graphql: GraphQLClient) {}

  async list(includeSystemDisabledCategories = false): Promise<{ categoryGroups: CategoryGroup[]; categories: Category[] }> {
    const data = await this.graphql.query<{ categoryGroups: CategoryGroup[]; categories: Category[] }>(
      COMMON_GET_CATEGORIES,
      { includeSystemDisabledCategories }
    );
    return data;
  }
}
