import test from 'node:test';
import assert from 'node:assert/strict';
import { createMcpTools } from '../src/mcp';

// Mock clients
const accountsClient = {
  async list() {
    return {
      hasAccounts: true,
      accountTypeSummaries: [
        {
          type: { name: 'checking' },
          accounts: [
            { id: 'acc1', displayName: 'Checking', displayBalance: 1000, isHidden: false },
            { id: 'acc2', displayName: 'Savings', displayBalance: 5000, isHidden: true },
          ],
          isAsset: true,
          totalDisplayBalance: 6000,
        },
      ],
    };
  },
} as any;

const transactionsClient = {
  async list() {
    return {
      totalCount: 2,
      totalSelectableCount: 2,
      results: [
        { id: 't1', amount: -10, date: '2026-01-01', merchant: { name: 'Coffee' }, category: { name: 'Food' } },
        { id: 't2', amount: 100, date: '2026-01-02', merchant: { name: 'Paycheck' }, category: { name: 'Income' } },
      ],
    };
  },
  async getTransaction(id: string) {
    if (id === 'missing') return null;
    return { id, amount: -10, date: '2026-01-01', merchant: { name: 'Coffee' }, category: { name: 'Food' } };
  },
} as any;

const categoriesClient = {
  async list() {
    return { categories: [{ id: 'c1', name: 'Food' }], categoryGroups: [{ id: 'g1', name: 'Essentials' }] };
  },
} as any;

const cashflowClient = {
  async entityAggregates() {
    return { summary: [{ summary: { sumIncome: 1000, sumExpense: 200, savings: 800, savingsRate: 80 } }] };
  },
} as any;

const tools = createMcpTools({
  accounts: accountsClient,
  transactions: transactionsClient,
  categories: categoriesClient,
  cashflow: cashflowClient,
});

test('mcp list_accounts returns formatted string', async () => {
  const res = await tools.list_accounts({ verbosity: 'ultra-light' });
  assert.equal(res.isError, undefined);
  assert(typeof res.data === 'string');
  assert((res.data as string).includes('accounts'));
});

test('mcp search_transactions returns formatted string', async () => {
  const res = await tools.search_transactions({ verbosity: 'light' });
  assert.equal(res.isError, undefined);
  assert(typeof res.data === 'string');
});

test('mcp fetch_transaction handles missing', async () => {
  const res = await tools.fetch_transaction({ id: 'missing', verbosity: 'light' });
  assert.equal(res.isError, true);
  assert.equal(res.cause, 'not_found');
});

test('mcp list_categories_tags returns data', async () => {
  const res = await tools.list_categories_tags();
  assert.equal(res.isError, undefined);
  assert.ok((res.data as any).categories.length);
});

test('mcp cashflow_summary returns formatted string', async () => {
  const res = await tools.cashflow_summary({ filters: {} });
  assert.equal(res.isError, undefined);
  assert(typeof res.data === 'string');
});
