import { GraphQLClient } from '../../core/transport/graphql';

export interface RecurringStream {
  stream: unknown;
  __typename?: string;
}

export interface AggregatedRecurringItems {
  groups: unknown;
  aggregatedSummary: unknown;
}

export interface RecurringTransactionItem {
  stream: unknown;
  nextForecastedTransaction?: unknown;
  category?: unknown;
  account?: unknown;
}

const RECURRING_MERCHANT_SEARCH = /* GraphQL */ `
  query RecurringMerchantSearch {
    recurringMerchantSearch
    recurringTransactionStreams {
      stream {
        id
        reviewStatus
        frequency
        amount
        baseDate
        dayOfTheMonth
        isApproximate
        name
        logoUrl
        recurringType
        merchant { id __typename }
        creditReportLiabilityAccount {
          id
          account { id __typename }
          lastStatement { id dueDate __typename }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

const COMMON_GET_AGGREGATED_RECURRING_ITEMS = /* GraphQL */ `
  query Common_GetAggregatedRecurringItems($startDate: Date!, $endDate: Date!, $filters: RecurringTransactionFilter) {
    aggregatedRecurringItems(startDate: $startDate, endDate: $endDate, filters: $filters) {
      groups
      aggregatedSummary
      __typename
    }
  }
`;

const COMMON_GET_ALL_RECURRING_TRANSACTION_ITEMS = /* GraphQL */ `
  query Common_GetAllRecurringTransactionItems($filters: RecurringTransactionFilter, $includeLiabilities: Boolean) {
    recurringTransactionStreams(
      filters: $filters
      includeLiabilities: $includeLiabilities
      includePending: true
    ) {
      stream {
        id
        reviewStatus
        frequency
        amount
        baseDate
        dayOfTheMonth
        isApproximate
        name
        logoUrl
        recurringType
        merchant { id __typename }
        creditReportLiabilityAccount {
          id
          account { id displayName __typename }
          lastStatement { id dueDate __typename }
          __typename
        }
        __typename
      }
      nextForecastedTransaction {
        id
        date
        amount
        status
        recurrenceId
        __typename
      }
      category {
        id
        name
        icon
        group { id type __typename }
        __typename
      }
      account {
        id
        displayName
        __typename
      }
      __typename
    }
  }
`;

export class RecurringClient {
  constructor(private graphql: GraphQLClient) {}

  async searchMerchants(): Promise<{ recurringMerchantSearch: unknown; recurringTransactionStreams: RecurringStream[] }> {
    const data = await this.graphql.query<{ recurringMerchantSearch: unknown; recurringTransactionStreams: RecurringStream[] }>(
      RECURRING_MERCHANT_SEARCH
    );
    return data;
  }

  async aggregatedItems(params: { startDate: string; endDate: string; filters?: Record<string, unknown> }): Promise<AggregatedRecurringItems> {
    const data = await this.graphql.query<{ aggregatedRecurringItems: AggregatedRecurringItems }>(
      COMMON_GET_AGGREGATED_RECURRING_ITEMS,
      { startDate: params.startDate, endDate: params.endDate, filters: params.filters ?? {} }
    );
    return data.aggregatedRecurringItems;
  }

  async listItems(params?: { filters?: Record<string, unknown>; includeLiabilities?: boolean }): Promise<RecurringTransactionItem[]> {
    const data = await this.graphql.query<{ recurringTransactionStreams: RecurringTransactionItem[] }>(
      COMMON_GET_ALL_RECURRING_TRANSACTION_ITEMS,
      { filters: params?.filters, includeLiabilities: params?.includeLiabilities ?? true }
    );
    return data.recurringTransactionStreams;
  }
}
