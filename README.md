# MonarchMoney TS SDK v2 (rewrite)

> ESM-only, no backward compatibility with v1. GraphQL-first client built from live captures; MCP-friendly formatters and tools.

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
console.log(page.accountTypeSummaries);
```

## Quickstart (email/password + TOTP)
```ts
import { AuthService, GraphQLClient, TransactionsClient } from 'monarchmoney';

const auth = new AuthService();
await auth.login({
  email: process.env.MONARCH_EMAIL!,
  password: process.env.MONARCH_PASSWORD!,
  totpSecret: process.env.MONARCH_TOTP_SECRET, // optional
  saveSession: true,
});

const gql = new GraphQLClient('https://api.monarchmoney.com', auth);
const txns = new TransactionsClient(gql);
const list = await txns.list({ limit: 20, filters: { transactionVisibility: 'non_hidden_transactions_only' } });
console.log(list.totalCount);
```

## Domains (current)
- Accounts, Transactions, Categories, Cashflow, Budgets/Goals, Recurring, Portfolio, Messaging/Advice.
- Schemas: `docs/schemas/*.ts` (request/response pairs from 2026-01-07 capture).
- Reference: `docs/API_REFERENCE_V2.md`; architecture: `docs/v2-architecture.md`; usage: `docs/README-V2.md`.

## Formatters
- `formatAccounts`, `formatTransactions`, `formatCashflowSummary` produce summary-first outputs (`ultra-light`, `light`, `standard`).

## MCP helpers
- `createMcpTools({ accounts, transactions, categories, cashflow })` exposes:
  - `get_active_context`, `list_accounts`, `search_transactions`, `fetch_transaction`, `list_categories_tags`, `cashflow_summary`.
- Errors map to `{ isError, cause, retriable, retryAfterMs, message }`.

## Build & test
- Build: `npm run build`
- Type-check: `npm run type-check`
- Tests: `npm test` (node:test via tsx)
- Format: `npm run format`

## License
MIT
