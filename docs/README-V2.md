# MonarchMoney TS SDK v2 (rewrite)

Status: v2 rewrite (no backward compatibility with v1). ESM-only build, GraphQL-first client, MCP-friendly formatters/tools. Use Node 18+.

## Install
```bash
npm install monarchmoney
```

## Quickstart (token)
```ts
import { AuthService, GraphQLClient, AccountsClient } from 'monarchmoney';

const auth = new AuthService();
await auth.loginWithToken({ token: process.env.MONARCH_TOKEN! });

const gql = new GraphQLClient('https://api.monarchmoney.com', auth);
const accounts = new AccountsClient(gql);

const page = await accounts.list();
console.log(page.accountTypeSummaries[0]?.accounts);
```

## Quickstart (email/password + TOTP)
```ts
import { AuthService, GraphQLClient, TransactionsClient } from 'monarchmoney';

const auth = new AuthService();
await auth.login({
  email: process.env.MONARCH_EMAIL!,
  password: process.env.MONARCH_PASSWORD!,
  totpSecret: process.env.MONARCH_TOTP_SECRET, // optional
  saveSession: true, // saves to ~/.mm/session.json
});

const gql = new GraphQLClient('https://api.monarchmoney.com', auth);
const txns = new TransactionsClient(gql);

const list = await txns.list({ limit: 20, filters: { transactionVisibility: 'non_hidden_transactions_only' } });
console.log(list.totalCount);
```

## Domains (initial coverage)
- Accounts: list, account types, aggregate snapshots, recent balances.
- Transactions: list, filters metadata/reference, transaction detail (drawer).
- Categories: list categories/groups.
- Cashflow: entity and timeframe aggregates.
- Budgets/Goals: status, settings, joint planning data, goals v2, subscription details.
- Recurring: merchant search, aggregated recurring items, recurring items.
- Portfolio: investment accounts, portfolio, allocation, securities performance, spinwheel credit report.
- Messaging/Advice: advice, message threads, messages, assistant feedback, user profile update.

## Formatters
- `formatAccounts(accounts, verbosity)` and `formatTransactions(txns, verbosity)` produce summary-first strings (`ultra-light`, `light`, `standard`).
- `formatCashflowSummary(summary)` for aggregate cashflow output.

## MCP helpers
- `createMcpTools({ accounts, transactions, categories, cashflow })` returns MCP-style tools:
  - `get_active_context`, `list_accounts`, `search_transactions`, `fetch_transaction`, `list_categories_tags`, `cashflow_summary`.
- Errors are mapped to `{ isError, cause, retriable, retryAfterMs, message }`.

## Build & test
- Build: `npm run build` (ESM out to `dist/`).
- Type check: `npm run type-check`.
- Tests: `npm test` (node:test via tsx).
- Format: `npm run format`.

## Schemas & docs
- Capture-derived schemas: `docs/schemas/*.ts` (request/response pairs).
- API reference: `docs/API_REFERENCE_V2.md`.
- Architecture: `docs/v2-architecture.md`.
