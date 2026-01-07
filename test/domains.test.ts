import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeTransactionFilters } from '../src/domains/transactions/index.js';
import { validateAccountsFilters } from '../src/domains/accounts/index.js';

test('sanitizeTransactionFilters applies default visibility and preserves allowed fields', () => {
  const out = sanitizeTransactionFilters({
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    accountIds: ['a1'],
    transactionVisibility: 'all',
  });
  assert.equal(out.transactionVisibility, 'all');
  assert.equal(out.startDate, '2026-01-01');
  assert.equal(out.endDate, '2026-01-31');
  assert.deepEqual(out.accountIds, ['a1']);

  const defaults = sanitizeTransactionFilters();
  assert.equal(defaults.transactionVisibility, 'non_hidden_transactions_only');
});

test('validateAccountsFilters parses includeHidden', () => {
  const out = validateAccountsFilters({ includeHidden: true });
  assert.equal(out.includeHidden, true);

  const out2 = validateAccountsFilters();
  assert.deepEqual(out2, {});

  assert.throws(() => validateAccountsFilters('bad'), /Invalid accounts filters/);
});
