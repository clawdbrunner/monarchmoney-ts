import { GraphQLClient } from '../../core/transport/graphql.js';

export interface TransactionFilterInput {
  transactionVisibility?: string;
  startDate?: string;
  endDate?: string;
  accountIds?: string[];
  categoryIds?: string[];
  merchantIds?: string[];
  tagIds?: string[];
  search?: string;
  isCredit?: boolean;
  minAmount?: number;
  maxAmount?: number;
}

export interface Transaction {
  id: string;
  amount: number;
  pending: boolean;
  date: string;
  category?: { id: string; name: string; icon?: string; group?: { id: string; type?: string } };
  merchant?: { id: string; name: string; transactionsCount?: number; logoUrl?: string };
  account?: { id: string; displayName?: string; icon?: string; logoUrl?: string };
  tags?: Array<{ id: string; name: string; color?: string; order?: number }>;
  notes?: string;
  needsReview?: boolean;
  reviewStatus?: string;
  isSplitTransaction?: boolean;
  dataProviderDescription?: string;
}

export interface TransactionsListResponse {
  totalCount: number;
  totalSelectableCount: number;
  results: Transaction[];
}

export function sanitizeTransactionFilters(input?: TransactionFilterInput): TransactionFilterInput {
  const base: TransactionFilterInput = {
    transactionVisibility: 'non_hidden_transactions_only',
  };
  if (!input) return base;
  const clean: TransactionFilterInput = { ...base };
  if (input.startDate) clean.startDate = input.startDate;
  if (input.endDate) clean.endDate = input.endDate;
  if (input.accountIds) clean.accountIds = [...input.accountIds];
  if (input.categoryIds) clean.categoryIds = [...input.categoryIds];
  if (input.merchantIds) clean.merchantIds = [...input.merchantIds];
  if (input.tagIds) clean.tagIds = [...input.tagIds];
  if (input.search) clean.search = input.search;
  if (input.isCredit !== undefined) clean.isCredit = Boolean(input.isCredit);
  if (input.minAmount !== undefined) clean.minAmount = input.minAmount;
  if (input.maxAmount !== undefined) clean.maxAmount = input.maxAmount;
  if (input.transactionVisibility) clean.transactionVisibility = input.transactionVisibility;
  return clean;
}

const WEB_GET_TRANSACTIONS_LIST = /* GraphQL */ `
  query Web_GetTransactionsList($offset: Int, $limit: Int, $filters: TransactionFilterInput, $orderBy: TransactionOrdering) {
    allTransactions(filters: $filters) {
      totalCount
      totalSelectableCount
      results(offset: $offset, limit: $limit, orderBy: $orderBy) {
        id
        ...TransactionOverviewFields
        __typename
      }
      __typename
    }
    transactionRules {
      id
      __typename
    }
  }

  fragment TransactionOverviewFields on Transaction {
    id
    amount
    pending
    date
    hideFromReports
    hiddenByAccount
    plaidName
    notes
    isRecurring
    reviewStatus
    needsReview
    isSplitTransaction
    dataProviderDescription
    attachments { id __typename }
    goal { id name __typename }
    savingsGoalEvent {
      id
      goal { id name __typename }
      __typename
    }
    category {
      id
      name
      icon
      group { id type __typename }
      __typename
    }
    merchant {
      name
      id
      transactionsCount
      logoUrl
      recurringTransactionStream { frequency isActive __typename }
      __typename
    }
    tags { id name color order __typename }
    account { id displayName icon logoUrl __typename }
    ownedByUser { id displayName profilePictureUrl __typename }
    __typename
  }
`;

const WEB_GET_TRANSACTION_FILTERS_METADATA = /* GraphQL */ `
  query Web_GetTransactionFiltersMetadata($input: TransactionFiltersMetadataInput!) {
    transactionFiltersMetadata(input: $input) {
      categories { id name icon group { id type __typename } __typename }
      categoryGroups { id name type __typename }
      accounts { id displayName icon logoUrl type __typename }
      merchants { id name __typename }
      tags { id name color order __typename }
      goals { id name __typename }
      savingsGoals { id name __typename }
      needsReviewByUser
      ownershipSet
      __typename
    }
  }
`;

const WEB_GET_TRANSACTION_FILTERS_QUERY = /* GraphQL */ `
  query Web_TransactionsFilterQuery {
    categoryGroups { id name order categories __typename }
    goalsV2 { id name imageStorageProvider imageStorageProviderId archivedAt priority __typename }
    savingsGoals { id name icon __typename }
    merchants { id name transactionCount logoUrl __typename }
    accounts { id displayName logoUrl icon type __typename }
    householdTransactionTags { id name order color __typename }
    myHousehold { id users __typename }
    householdPreferences { accountGroupOrder collaborationToolsEnabled __typename }
  }
`;

const GET_TRANSACTION_DRAWER = /* GraphQL */ `
  query GetTransactionDrawer($id: String!, $redirectPosted: Boolean) {
    getTransaction(id: $id, redirectPosted: $redirectPosted) {
      id
      amount
      pending
      isRecurring
      date
      originalDate
      hideFromReports
      needsReview
      reviewedAt
      reviewedByUser { id displayName __typename }
      reviewStatus
      originalDescription
      dataProviderDescription
      notes
      category { id name icon __typename }
      merchant { id name logoUrl __typename }
      account { id displayName icon __typename }
      tags { id name color order __typename }
      goal { id name __typename }
      savingsGoalEvent { id __typename }
      splits {
        id
        amount
        category { id name icon __typename }
        __typename
      }
      __typename
    }
    myHousehold { id users __typename }
  }
`;

export class TransactionsClient {
  constructor(private graphql: GraphQLClient) {}

  async list(params: {
    limit?: number;
    offset?: number;
    filters?: TransactionFilterInput;
    orderBy?: string;
  }): Promise<TransactionsListResponse> {
    const { limit = 50, offset = 0, filters, orderBy = 'date' } = params;
    const builtFilters = sanitizeTransactionFilters(filters);
    const data = await this.graphql.query<{
      allTransactions: TransactionsListResponse;
    }>(WEB_GET_TRANSACTIONS_LIST, { limit, offset, filters: builtFilters, orderBy });
    return data.allTransactions;
  }

  async getFiltersMetadata(input: Record<string, unknown>): Promise<unknown> {
    const data = await this.graphql.query<{ transactionFiltersMetadata: unknown }>(
      WEB_GET_TRANSACTION_FILTERS_METADATA,
      { input }
    );
    return data.transactionFiltersMetadata;
  }

  async getFiltersReference(): Promise<unknown> {
    const data = await this.graphql.query<unknown>(WEB_GET_TRANSACTION_FILTERS_QUERY);
    return data;
  }

  async getTransaction(id: string, redirectPosted = false): Promise<unknown> {
    const data = await this.graphql.query<{ getTransaction: unknown }>(
      GET_TRANSACTION_DRAWER,
      { id, redirectPosted }
    );
    return data.getTransaction;
  }
}
