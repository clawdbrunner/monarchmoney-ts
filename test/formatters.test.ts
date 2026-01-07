import test from 'node:test';
import assert from 'node:assert/strict';
import { formatAccounts, formatTransactions } from '../src/formatters';

const sampleAccounts = [
  { id: 'acc1', displayName: 'Checking', displayBalance: 1200.5, isHidden: false },
  { id: 'acc2', displayName: 'Savings', displayBalance: 5000, isHidden: true },
];

const sampleTxns = [
  { id: 't1', amount: -42.5, date: '2026-01-01', merchant: { name: 'Coffee' }, category: { name: 'Food' } },
  { id: 't2', amount: 1000, date: '2026-01-02', merchant: { name: 'Paycheck' }, category: { name: 'Income' } },
];

test('formatAccounts ultra-light', () => {
  const out = formatAccounts(sampleAccounts as any, 'ultra-light');
  assert(out.includes('2 accounts'));
});

test('formatAccounts light', () => {
  const out = formatAccounts(sampleAccounts as any, 'light');
  assert(out.includes('Total'));
  assert(out.includes('Checking'));
});

test('formatTransactions ultra-light', () => {
  const out = formatTransactions(sampleTxns as any, 'ultra-light');
  assert(out.includes('2 txns'));
});

test('formatTransactions light', () => {
  const out = formatTransactions(sampleTxns as any, 'light');
  assert(out.includes('Coffee'));
  assert(out.includes('Paycheck'));
});
