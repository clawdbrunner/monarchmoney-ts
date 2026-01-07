# Monarch Money SDK – v2 Rewrite Plan (no backward compatibility)

Branch: `v2-rewrite`  
Goal: clean, ESM-first client with MCP-friendly surfaces, new API shapes from 2026-01-07 capture. v1 is not preserved.

## Targets
- ESM-only build (Node 18+); publishable as `monarchmoney` v2 (breaking).
- Lean client: auth/session + GraphQL transport + domain modules built from captured schemas.
- MCP alignment: summary-first tool shapes (`search`, `fetch`, `update`, `list`) + formatter outputs; optional MCP server later.
- Error model: use existing `Monarch*Error` classes, tighten cause/retriable mapping.
- No legacy exports or v1 compatibility shims.

## Module layout (proposed)
```
src/
  core/
    auth/          # Token/TOTP login, session store, encryption
    transport/     # GraphQL client, rate limit, retries, cache hooks
    types/         # Shared primitives (pagination, money, date filters)
    errors/        # Error catalog aligned to MCP causes
  domains/
    accounts/
    transactions/
    categories/
    cashflow/
    budgets/
    recurring/
    portfolio/
    insights/
    messaging/
  formatters/      # Verbosity + MCP-friendly summaries
  mcp/             # (optional later) tool/resource surface using formatters
```
- Keep `docs/schemas/` as the schema source for v2 codegen/manual typing.
- Keep `docs/API_REFERENCE_V2.md` as the canonical reference; update as we add endpoints.

## Domain scope (based on capture + priorities)
- Accounts: `Web_GetAccountsPage`, `Web_GetAccountsPageRecentBalance`, `Common_GetAggregateSnapshots`, `Web_GetAccountTypes`, `Common_GetDisplayBalanceAtDate`.
- Transactions: `Web_GetTransactionsList`, `Web_GetTransactionsSummaryCard`, `Web_TransactionsFilterQuery`, `Web_GetTransactionFiltersMetadata`, `Web_GetDownloadTransactionsSession`, `GetTransactionDrawer`, `Common_TransactionSplitQuery`, merchant selectors, transaction rules.
- Categories/Tags: `Common_GetCategories`, `Common_GetHouseholdTransactionTags`.
- Cashflow/Reports: `Common_GetCashFlowEntityAggregates`, `Common_GetCashFlowTimeframeAggregates`, `Common_GetReportsData`, `Web_GetReportConfigurations`.
- Budgets/Goals: `Common_GetBudgetStatus`, `Common_GetBudgetSettings`, `Common_GetJointPlanningData`, `Web_GoalsV2`, `Common_GetSubscriptionDetails`, `Common_MigratedToSavingsGoals`.
- Recurring: `RecurringMerchantSearch`, `Common_GetAggregatedRecurringItems`, `Common_GetAllRecurringTransactionItems`.
- Portfolio: `Web_GetInvestmentsAccounts`, `Web_GetPortfolio`, `Web_GetAllocation`, `Web_GetSecuritiesHistoricalPerformance`.
- Messaging/Advice: `AdviceQuery_Web`, `Common_GetMessageThreads`, `Common_GetMessageThread`, `Common_CreateThreadMutation`, `Common_SendMessage`, `Common_GetAssistantFeedback`, `Common_UpdateUserProfile`.

## Auth/session
- Token auth header: `Authorization: Token <token>`.
- TOTP/interactive MFA flows carried over, but simplify interface: `login({ email, password, totpSecret?, saveSession? })`, `loginWithToken({ token })`.
- Session store: `~/.mm/session.json` encrypted when `cacheEncryptionKey` set; allow custom path.
- Device UUID header maintained for parity.

## Transport
- GraphQL client with:
  - rate limit (min interval + burst guard),
  - retries with jitter and `Retry-After`,
  - per-call cache toggle,
  - request deduplication,
  - structured errors mapped to `auth|rate_limit|validation|not_found|dependency_down`.
- Consider optional adapter layer for streaming/batching later.

## Formatting & MCP
- Keep verbosity levels (`ultra-light`, `light`, `standard`).
- MCP tool shapes: `get_active_context`, `search_transactions`, `fetch_transaction`, `update_transactions` (composite), `list_accounts`, `list_categories_tags`, plus cached resources.
- Use formatters for summary-first outputs by default; raw data optional via `include_details`.

## Build/test
- Drop CJS build; keep ESM + types.
- Tests: start with unit tests per domain using captured schemas; add snapshot tests for formatter outputs.
- Remove v1 test files as v2 code replaces them.

## Incremental steps
1) Scaffold v2 folder structure and package config (ESM-only). ✅
2) Implement auth/session + transport using captured header patterns and simplified API.
3) Implement domains in priority order (accounts, transactions, categories/tags, cashflow) using `docs/schemas/` for types.
4) Add formatter utilities and MCP-ready summaries.
5) Update docs (`API_REFERENCE_V2.md`, `v2-api-docs.md`) as endpoints land.
6) Remove/ignore v1 entrypoints and tests once v2 equivalents exist.
