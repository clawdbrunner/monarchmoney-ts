import type { Account } from '../domains/accounts';
import type { Transaction } from '../domains/transactions';
export * from './cashflow';

export type Verbosity = 'ultra-light' | 'light' | 'standard';

export function formatAccounts(accounts: Account[], verbosity: Verbosity = 'light'): string {
  if (!accounts.length) return 'No accounts found';

  const total = accounts.reduce((sum, acc) => sum + (acc.displayBalance ?? 0), 0);

  if (verbosity === 'ultra-light') {
    return `💰 ${accounts.length} accounts • Total $${total.toLocaleString()}`;
  }

  if (verbosity === 'light') {
    const lines = accounts.map(acc => {
      const bal = acc.displayBalance ?? 0;
      const hidden = acc.isHidden ? ' (hidden)' : '';
      return `• ${acc.displayName}: $${bal.toLocaleString()}${hidden}`;
    });
    lines.push(`Total: $${total.toLocaleString()}`);
    return lines.join('\n');
  }

  // standard: JSON
  return JSON.stringify(accounts, null, 2);
}

export function formatTransactions(
  transactions: Transaction[],
  verbosity: Verbosity = 'light',
  label?: string
): string {
  if (!transactions.length) return 'No transactions found';

  const header = label ? `${label}\n` : '';
  if (verbosity === 'ultra-light') {
    const volume = transactions.reduce((sum, txn) => sum + Math.abs(txn.amount), 0);
    return `${header}💳 ${transactions.length} txns • Vol $${volume.toLocaleString()}`;
  }

  if (verbosity === 'light') {
    const lines = transactions.map(txn => {
      const date = txn.date;
      const amt = Math.abs(txn.amount).toLocaleString();
      const sign = txn.amount < 0 ? '-' : '';
      const merch = txn.merchant?.name ?? 'Unknown';
      const cat = txn.category?.name ?? 'Uncategorized';
      return `• ${date} ${merch} $${sign}${amt} • ${cat}`;
    });
    return header + lines.join('\n');
  }

  return header + JSON.stringify(transactions, null, 2);
}
