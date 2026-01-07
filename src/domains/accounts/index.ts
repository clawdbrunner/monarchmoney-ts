// Accounts domain placeholder – implement using schemas in docs/schemas/
export interface AccountSummary {
  id: string;
  displayName: string;
  displayBalance?: number;
  includeInNetWorth?: boolean;
  type?: { name?: string; display?: string; group?: string };
}
import { GraphQLClient } from '../../core/transport/graphql';

// Types pared down for v2; use docs/schemas for full fields if needed.
export interface Account {
  id: string;
  displayName: string;
  displayBalance?: number;
  signedBalance?: number;
  isHidden?: boolean;
  isAsset?: boolean;
  includeInNetWorth?: boolean;
  includeBalanceInNetWorth?: boolean;
  displayLastUpdatedAt?: string;
  limit?: number | null;
  type?: { name?: string; display?: string; group?: string };
  subtype?: { display?: string };
  institution?: { id: string; name?: string; logo?: string | null };
}

export interface AccountsPageResponse {
  hasAccounts: boolean;
  accountTypeSummaries: Array<{
    type: { name?: string; display?: string; group?: string };
    accounts: Account[];
    isAsset: boolean;
    totalDisplayBalance: number;
  }>;
}

export interface AccountsFilters {
  // Placeholder for future filters (e.g., includeHidden, institutions, ownership)
  [key: string]: unknown;
}

const WEB_GET_ACCOUNTS_PAGE = /* GraphQL */ `
  query Web_GetAccountsPage($filters: AccountFilters) {
    hasAccounts
    accountTypeSummaries(filters: $filters) {
      type { name display group __typename }
      accounts {
        id
        syncDisabled
        isHidden
        isAsset
        includeInNetWorth
        includeBalanceInNetWorth
        order
        type { name display __typename }
        displayName
        displayBalance
        signedBalance
        updatedAt
        icon
        logoUrl
        displayLastUpdatedAt
        limit
        mask
        subtype { display __typename }
        credential {
          id
          updateRequired
          dataProvider
          disconnectedFromDataProviderAt
          syncDisabledAt
          syncDisabledReason
          __typename
        }
        institution {
          id
          logo
          name
          status
          plaidStatus
          newConnectionsDisabled
          hasIssuesReported
          url
          hasIssuesReportedMessage
          transactionsStatus
          balanceStatus
          __typename
        }
        ownedByUser { id displayName profilePictureUrl __typename }
        __typename
      }
      isAsset
      totalDisplayBalance
      __typename
    }
    householdPreferences {
      id
      accountGroupOrder
      collaborationToolsEnabled
      __typename
    }
  }
`;

const WEB_GET_ACCOUNT_TYPES = /* GraphQL */ `
  query Web_GetAccountTypes {
    accountTypes {
      name
      display
      group
      showForSyncedAccounts
      possibleSubtypes
      __typename
    }
  }
`;

const COMMON_GET_AGGREGATE_SNAPSHOTS = /* GraphQL */ `
  query Common_GetAggregateSnapshots($filters: AggregateSnapshotFilters) {
    aggregateSnapshots(filters: $filters) {
      date
      balance
      assetsBalance
      liabilitiesBalance
      __typename
    }
  }
`;

const WEB_GET_ACCOUNTS_PAGE_RECENT_BALANCE = /* GraphQL */ `
  query Web_GetAccountsPageRecentBalance($startDate: Date) {
    accounts {
      id
      recentBalances(startDate: $startDate)
      type { name __typename }
      includeInNetWorth
      __typename
    }
  }
`;

export class AccountsClient {
  constructor(private graphql: GraphQLClient) {}

  async list(filters?: AccountsFilters): Promise<AccountsPageResponse> {
    const data = await this.graphql.query<{ hasAccounts: boolean; accountTypeSummaries: AccountsPageResponse['accountTypeSummaries'] }>(
      WEB_GET_ACCOUNTS_PAGE,
      { filters }
    );
    return data;
  }

  async getAccountTypes(): Promise<Array<{ name: string; display: string; group?: string; possibleSubtypes?: string[] }>> {
    const data = await this.graphql.query<{ accountTypes: Array<{ name: string; display: string; group?: string; possibleSubtypes?: string[] }> }>(
      WEB_GET_ACCOUNT_TYPES
    );
    return data.accountTypes;
  }

  async getAggregateSnapshots(filters?: Record<string, unknown>): Promise<Array<{ date: string; balance: number; assetsBalance: number; liabilitiesBalance: number }>> {
    const data = await this.graphql.query<{ aggregateSnapshots: Array<{ date: string; balance: number; assetsBalance: number; liabilitiesBalance: number }> }>(
      COMMON_GET_AGGREGATE_SNAPSHOTS,
      { filters }
    );
    return data.aggregateSnapshots;
  }

  async getRecentBalances(startDate?: string): Promise<Array<{ id: string; recentBalances: number[]; type?: { name?: string }; includeInNetWorth?: boolean }>> {
    const data = await this.graphql.query<{ accounts: Array<{ id: string; recentBalances: number[]; type?: { name?: string }; includeInNetWorth?: boolean }> }>(
      WEB_GET_ACCOUNTS_PAGE_RECENT_BALANCE,
      { startDate }
    );
    return data.accounts;
  }
}
