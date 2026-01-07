import type { AccountsClient } from '../domains/accounts';
import type { TransactionsClient } from '../domains/transactions';
import type { CategoriesClient } from '../domains/categories';
import type { CashflowClient } from '../domains/cashflow';
import { formatAccounts, formatCashflowSummary, formatTransactions } from '../formatters';
import { MonarchError } from '../core/errors';

export interface McpContextClients {
  accounts: AccountsClient;
  transactions: TransactionsClient;
  categories: CategoriesClient;
  cashflow: CashflowClient;
}

export interface McpToolResponse {
  isError?: boolean;
  cause?: string;
  retriable?: boolean;
  retryAfterMs?: number;
  message?: string;
  data?: unknown;
}

export function createMcpTools(clients: McpContextClients) {
  const wrap = async (fn: () => Promise<McpToolResponse>): Promise<McpToolResponse> => {
    try {
      return await fn();
    } catch (err) {
      if (err instanceof MonarchError) {
        return {
          isError: true,
          cause: err.causeCategory,
          retriable: err.retriable,
          retryAfterMs: err.retryAfterMs,
          message: err.message,
        };
      }
      return { isError: true, cause: 'unknown', retriable: false, message: (err as Error).message };
    }
  };

  return {
    async list_accounts(opts?: { verbosity?: 'ultra-light' | 'light' | 'standard'; includeHidden?: boolean }): Promise<McpToolResponse> {
      return wrap(async () => {
        const data = await clients.accounts.list({ includeHidden: opts?.includeHidden });
        const accounts = data.accountTypeSummaries.flatMap(s => s.accounts);
        return { data: formatAccounts(accounts, opts?.verbosity) };
      });
    },
    async search_transactions(opts: {
      filters?: Record<string, unknown>;
      limit?: number;
      offset?: number;
      orderBy?: string;
      verbosity?: 'ultra-light' | 'light' | 'standard';
    }): Promise<McpToolResponse> {
      return wrap(async () => {
        const data = await clients.transactions.list({
          filters: opts.filters,
          limit: opts.limit,
          offset: opts.offset,
          orderBy: opts.orderBy,
        });
        return { data: formatTransactions(data.results, opts.verbosity) };
      });
    },
    async fetch_transaction(opts: { id: string; redirectPosted?: boolean; verbosity?: 'ultra-light' | 'light' | 'standard' }): Promise<McpToolResponse> {
      return wrap(async () => {
        const txn = await clients.transactions.getTransaction(opts.id, opts.redirectPosted ?? false);
        if (!txn) return { isError: true, cause: 'not_found', message: 'Transaction not found', retriable: false };
        if (opts.verbosity && opts.verbosity !== 'standard') {
          return { data: formatTransactions([txn as any], opts.verbosity) };
        }
        return { data: txn };
      });
    },
    async list_categories_tags(): Promise<McpToolResponse> {
      return wrap(async () => {
        const data = await clients.categories.list();
        return { data };
      });
    },
    async cashflow_summary(opts: { filters: Record<string, unknown> }): Promise<McpToolResponse> {
      return wrap(async () => {
        const data = await clients.cashflow.entityAggregates(opts.filters as any);
        const summary = Array.isArray(data.summary) && data.summary[0]?.summary ? data.summary[0].summary : undefined;
        return { data: formatCashflowSummary(summary as any) };
      });
    },
    async get_active_context(): Promise<McpToolResponse> {
      return wrap(async () => ({
        data: {
          status: 'ok',
          hints: ['list_accounts', 'search_transactions', 'list_categories_tags', 'cashflow_summary'],
        },
      }));
    },
  };
}
