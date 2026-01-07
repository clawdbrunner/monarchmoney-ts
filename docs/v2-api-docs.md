# Monarch Money SDK v2 – API Docs Working Draft

Working draft for v2 API documentation. Focus is documentation only (no code changes) and pulls in lessons from the community projects.

## External references reviewed
- `eshaffer321/monarchmoney-go` (Go): full auth (MFA/TOTP), session file, rate limiting + retries, hooks, concurrent calls, refresh jobs, query builder + streaming.
- `troykirin/monarchmoney-python-sdk` (Python): async token client, CLI, Apple account tooling; test report suggests adding rate limiting, caching, retries.
- `chernetsov/monarch-money-ts` (TS): typed GraphQL client (accounts/budgets/categories/portfolio/rules/transactions), integration tests, traffic recorder DevTools extension, `mmtraf` analyzer.
- `WoodardDigital/Monarch-Money-Walmart` (Python): Walmart receipt splitter; reuses saved Monarch sessions (`.mm/`), 1Password auth, dry-run, PyInstaller binary.
- `eshaffer321/itemize` (Go + Next.js): retailer order sync with AI categorization/splitting, layered architecture, SQLite dedup, API server + web UI, Playwright E2E; uses `monarchmoney-go`.
- `wesm/moneyflow` (Python TUI): keyboard-first Monarch/YNAB client with bulk editing and review-before-commit, encrypted credentials, Amazon import, date-windowed fetches, themed outputs.
- `krisrowe/monarch-access` (Python CLI/SDK + MCP): tables/JSON/CSV output, updates & splits, mark reviewed, net worth; provider interface; packaged MCP server with tool/resource docs.

## Auth & session flows
- Flows: credential login (`login`), interactive login (prompts), MFA/TOTP (`multiFactorAuthenticate`, `mfaSecretKey`), direct login (`directLogin`) that mirrors browser traffic, session reuse/validation (`useSavedSession`, `validateSession`, `ensureValidSession`).
- Session storage: stored at `~/.mm/session.json`, 0600, optional encryption via `cacheEncryptionKey`; includes device UUID for header parity.
- Env support: `MONARCH_EMAIL`, `MONARCH_PASSWORD`, `MONARCH_SESSION_TOKEN`, `MONARCH_BASE_URL`, `MONARCH_CACHE_ENCRYPTION_KEY`, `MONARCH_LOG_LEVEL`.

| Option | Purpose | Default |
| --- | --- | --- |
| `email`, `password` | Credential login | `''` |
| `mfaSecretKey` | TOTP secret for auto-MFA | `undefined` |
| `useSavedSession` / `saveSession` | Reuse/persist session file | `true` / `true` |
| `interactive` | Allow CAPTCHA/MFA prompts | `true` |
| `maxCaptchaRetries` | CAPTCHA retry budget | `3` |
| `directLogin` options | Email/password, reuses session store | n/a |

Example (credential + TOTP, persisted session):
```ts
const client = new MonarchClient({ cacheEncryptionKey: process.env.MONARCH_CACHE_ENCRYPTION_KEY })
await client.login({
  email: process.env.MONARCH_EMAIL,
  password: process.env.MONARCH_PASSWORD,
  mfaSecretKey: process.env.MONARCH_TOTP_SECRET,
  useSavedSession: true,
  saveSession: true
})
```

## Client configuration (current defaults)
| Config | Default | Notes |
| --- | --- | --- |
| `baseURL` | `https://api.monarchmoney.com` | GraphQL endpoint suffixed with `/graphql` |
| `timeout` | `30000` ms | Per request |
| `retries` / `retryDelay` | `3` / `1000` ms | Used by auth + GraphQL retry/backoff |
| `cache.memoryTTL` | accounts `300000` ms; categories `1800000`; transactions `120000`; budgets `600000` | In-memory |
| `cache.persistentTTL` | session `86400000`; userProfile `3600000` | On-disk cache |
| `enablePersistentCache` | `true` | Uses `~/.mm` |
| `cacheEncryptionKey` | `''` | Enables encrypted session/cache |
| `rateLimit` | `requestsPerMinute: 60`, `burstLimit: 10` | Client also applies 250ms min interval + burst guard 5 |
| `logLevel` | `info` | Uses shared `logger` util |
| Concurrency | max 3 in-flight GraphQL, request deduplication, queueing | Mirrors web human-like pacing |

GraphQL client behavior: header parity with web (Token auth, device UUID, `Client-Platform:web`), automatic session validation, cache opt-in per call, mutation-driven cache invalidation, retries with backoff, jittered rate limiting before requests.

## Domain coverage (current SDK, web/HAR-aligned queries)

### Accounts (`src/api/accounts`)
| Operation | Inputs | Notes / Status |
| --- | --- | --- |
| `getAll` | `includeHidden`, `verbosity` | Uses `getQueryForVerbosity`, cache 5m; filters hidden accounts client-side |
| `getById` | `id` | Cached 5m |
| `getBalances` | `startDate`, `endDate` | Returns current balances only; balance history TODO |
| `getTypeOptions` | — | Cached 30m |
| `getHistory` | `accountId`, date range | Uses `Web_GetAccountsPageRecentBalance`; currently returns current balance (needs proper recentBalances parse) |
| `getNetWorthHistory` | `startDate`, `endDate` | Uses `GET_NET_WORTH_HISTORY`, adaptive granularity |
| `createManualAccount` | `name`, `typeName`, `subtypeName`, `balance`, flags | Returns errors array from mutation |
| `updateAccount` | `id`, `displayName`, `isHidden`, `includeInNetWorth`, `currentBalance` | Mutation + error surface |
| `deleteAccount` | `id` | Returns success boolean |
| `requestRefresh` | `accountIds?` | Returns `success`, `refreshId` |
| `isRefreshComplete` | `refreshId?` | Returns `isComplete`; logs errors and returns `false` on failure |

### Transactions (`src/api/transactions`)
| Operation | Inputs | Notes / Status |
| --- | --- | --- |
| `getTransactions` | pagination, date range, category/account/tag/merchant filters, search, `isCredit`, amount range | Uses `Web_GetTransactionsList` (web query), includes `transactionRules` presence |
| `getTransactionDetails` | `transactionId` | `GetTransactionDrawer` query |
| `createTransaction` / `updateTransaction` / `deleteTransaction` | standard fields | Mutations modeled on web schema |
| `getTransactionsSummary`, `getTransactionsSummaryCard` | — | Summary queries from web |
| `getTransactionSplits` / `updateTransactionSplits` | `transactionId`, `splits` | Split management |
| Rules: `getTransactionRules`, `create*`, `update*`, `delete*`, `deleteAllTransactionRules`, `previewTransactionRule` | rule definitions | Web-compatible schema |
| Categories: `getTransactionCategories`, `create*`, `update*`, `delete*`, `getCategoryDetails`, `getCategoryDetails` | Category CRUD inside transactions module; overlaps Categories API |
| Tags: `getTransactionTags`, `createTransactionTag`, `setTransactionTags` | Tag management |
| Merchants: `getMerchants`, `getMerchantDetails`, `getEditMerchant` | Merchant lookup/edit payloads |
| Recurring (inside transactions): `getRecurringTransactions`, `getRecurringStreams`, `getAggregatedRecurringItems`, `getAllRecurringTransactionItems`, `reviewRecurringStream`, `markStreamAsNotRecurring`, `getRecurringMerchantSearchStatus` | Stream and item access mirrors web recurring queries |
| Bulk: `bulkUpdateTransactions`, `bulkHideTransactions`, `bulkUnhideTransactions`, `getHiddenTransactions` | Bulk ops accept filters + selected/all toggles |

### Budgets & Goals (`src/api/budgets`)
| Operation | Inputs | Notes / Status |
| --- | --- | --- |
| `getBudgets` | `startDate`, `endDate`, `categoryIds` | Returns budget system, monthly amounts by category/group/flex |
| `setBudgetAmount` | `amount`, `categoryId`/`categoryGroupId`, timeframe, `startDate`, `applyToFuture` | Mutation-based |
| `getGoals`, `createGoal`, `updateGoal`, `deleteGoal` | Goal CRUD, planned contributions, monthly summaries | Uses goals v2 fields |
| `getCashFlow`, `getCashFlowSummary` | Date range + filters | Aligns to cashflow aggregates (see Cashflow API) |
| `getBills` | Date range + status | Bill tracking payload |

### Categories & Tags (`src/api/categories`)
| Operation | Inputs | Notes / Status |
| --- | --- | --- |
| `getCategories` / `getCategoryById` | `categoryId` | Uses `GetCategories` + `CategoryFields` fragments from web |
| `createCategory` / `updateCategory` / `deleteCategory` / `deleteCategories` | category data | Error surfaces returned from mutations |
| `getCategoryGroups`, `getCategoryGroupById` | `groupId` | Group metadata |
| Tags: `getTags`, `getTagById`, `createTag`, `updateTag`, `deleteTag` | Tag CRUD |
| Transaction tagging: `setTransactionTags`, `addTagToTransaction`, `removeTagFromTransaction` | Tag assignment |

### Cashflow (`src/api/cashflow`)
| Operation | Inputs | Notes / Status |
| --- | --- | --- |
| `getCashflow` | `startDate`, `endDate`, transaction filters | Defaults to current month; web `Web_GetCashFlowPage` aggregates by category/group/account |
| `getCashflowSummary` | same filters | Wraps summary section of cashflow query |

### Recurring (`src/api/recurring`)
| Operation | Inputs | Notes / Status |
| --- | --- | --- |
| `getRecurringStreams` | `includeLiabilities`, `includePending`, filters | Uses `Common_GetRecurringStreams` web query |
| `getUpcomingRecurringItems` | `startDate`, `endDate`, filters | `Web_GetUpcomingRecurringTransactionItems` |
| `markStreamAsNotRecurring` | `streamId` | Web mutation to disable stream |

### Institutions (`src/api/institutions`)
| Operation | Inputs | Notes / Status |
| --- | --- | --- |
| `getInstitutions` | — | Derived from `credentials` because `institutions` field absent; deduped |
| `getInstitutionSettings` | — | Returns credentials, accounts (including deleted), subscription flags |

### Insights (`src/api/insights`)
| Operation | Inputs | Notes / Status |
| --- | --- | --- |
| `getInsights` | date range, `insightTypes` | Financial insight list |
| `getNetWorthHistory` | date range (defaults to last 12 months) | Uses `netWorthHistory` |
| `getCreditScore` | `includeHistory` | Score + factors |
| `getNotifications` | — | Account notifications |
| `getSubscriptionDetails` | — | Plan info |
| `dismissInsight` | `insightId` | Mutation |

## Request/response examples (summary-first)
- Accounts list (light verbosity):
  - Request: `getAll({ includeHidden: false, verbosity: 'light' })`
  - Response shape: `{ id, displayName, currentBalance, isHidden, institution { name }, type { display } }[]` plus formatter-friendly totals.
- Transactions list (filters + pagination):
  - Request: `getTransactions({ limit: 20, offset: 0, startDate: '2025-01-01', endDate: '2025-01-31', search: 'amazon', absAmountRange: [50, 500] })`
  - Response shape: `{ transactions: Transaction[], totalCount, hasMore, limit, offset }` where each Transaction includes merchant, category, account, tags, review flags, split marker.
- Goals create:
  - Request: `createGoal({ name: 'Emergency Fund', targetAmount: 5000, targetDate: '2025-12-31', accountIds: ['acc_123'] })`
  - Response: `{ goal: { id, name, targetAmount, priority, plannedContributions, monthlyContributionSummaries }, errors? }`
- Cashflow summary:
  - Request: `getCashflowSummary({ startDate: '2025-01-01', endDate: '2025-01-31' })`
  - Response: `{ sumIncome, sumExpense, savings, savingsRate }`
- Recurring streams:
  - Request: `getRecurringStreams({ includeLiabilities: true })`
  - Response: `{ stream: { id, name, amount, frequency, merchant { id }, creditReportLiabilityAccount?, category?, account? } }[]`

## AI & MCP alignment
- Verbosity + formatting: `ResponseFormatter` supports `ultra-light`, `light`, `standard` for accounts, transactions, quick stats, spending summaries; matches README marketing claims and is suitable for MCP responses.
- Target MCP surface: mirror `monarch-access` tools/resources (list_accounts, list_categories, list_transactions, get/update/split transactions, mark reviewed) and reuse formatter outputs for compact responses.
- Context trimming: prefer `verbosity` selectors and formatter helpers before handing data to assistants; document examples per tool once MCP mapping is defined.

### MCP tool/resource mapping (proposed, Playbook-aligned)
- `get_active_context`: return session state, user email (if available), cache status, and last sync timestamps; summary-first, no raw tokens.
- `search_transactions(query, filters, limit, cursor)`: maps to `getTransactions` with summary items (date, merchant, amount, category, needsReview, id) and next-step guidance; include `cursor` and `totalCount`.
- `fetch_transaction(id, include_splits?, include_history?)`: maps to `getTransactionDetails`, returns compact detail and splits.
- `update_transactions(operation, payload, idempotency_key?)`: composite tool for update/hide/unhide/mark-reviewed/split; include `dry_run` flag; expose idempotency key to make retries safe.
- `list_accounts(filters, verbosity)`: uses `getAll`; default to `ultra-light` or `light` formatter.
- `list_categories_tags()`: combines categories, category groups, tags in one call with minimal fields.
- Resources: `monarch://accounts`, `monarch://categories`, `monarch://transactions?since=...` as cached, refreshable snapshots; document freshness and size caps.
- Output shape: summary-first with `ids`, `counts`, and “next” hints; optional `include_details` flag for structured expansions; avoid dumping raw GraphQL by default.
- Error surface: `isError`, `cause` (`auth`, `rate_limit`, `validation`, `not_found`, `dependency_down`), `retriable`, and “how to proceed” text per Playbook guidance.
- Tool ergonomics: one tool per intent category (no overlap), composite operations instead of long chains, and idempotency keys/dry-run where side effects exist (aligns with MCP Design Playbook North Star).

### Suggested tool IO shapes (LLM-friendly, summary-first)
- `get_active_context() -> { user?: string, session: { isValid, isStale, expiresAt? }, cache: { enabled, encryption: bool }, lastSync?: { accounts, transactions }, next: "search_transactions or list_accounts" }`
- `search_transactions(query?, filters?, limit=20, cursor?) -> { items: [{ id, date, merchant, amount, category, needsReview }...], totalCount, cursor?, next: "fetch_transaction(id)" }`
- `fetch_transaction(id, include_splits?, include_history?) -> { transaction: { id, date, merchant, amount, category, account, tags, reviewStatus, notes, splits? }, history? }`
- `update_transactions(operation, payload, idempotency_key?, dry_run=false) -> { success, affectedCount, preview? }` where `operation` ∈ `[update_fields, hide, unhide, mark_reviewed, split]`.
- `list_accounts(filters?, verbosity='light') -> { accounts: formatted/string or structured list, count, totalBalance?, hiddenCount? }`
- `list_categories_tags() -> { categories: [{ id, name, group }], tags: [{ id, name, color }] }`
- Resources: expose cached JSON snapshots with minimal fields and `lastUpdated` metadata; allow refresh parameter to force live fetch.

### Schema references (source of truth + mmtraf capture plan)
- Types are defined in `src/types/index.ts` and per-API modules; use these for initial schema tables.
- For exact wire shapes, capture traffic with the DevTools recorder + `mmtraf` (from `chernetsov/monarch-money-ts`):
  1) Load extension, record GraphQL, export JSON to `traffic/`.
  2) Run `pnpm mmtraf schema:req-at <file>.json <index>` and `schema:res-at` to infer request/response types.
  3) Paste distilled fields into this doc (summary-first, not raw dumps). Note operation name from `graphql:req-at`.
- Until real captures are added, rely on the per-method tables above and TS types; mark any inferred fields as “provisional”.
- Current capture summary: see `docs/mmtraf-capture-2026-01-07.md` for the first occurrence of 53 operations (accounts, transactions, cashflow, budgets, portfolio, recurring, messaging, advice). Use the listed indices with `mmtraf schema:req-at|res-at` for full types.
- Full request/response schemas generated from that capture live in `docs/schemas/` and are collated in `docs/API_REFERENCE_V2.md` for per-operation reference.

## Automation & tooling (patterns to document)
- Traffic capture & replay: Chrome DevTools traffic recorder + `mmtraf` analyzer from `chernetsov/monarch-money-ts` for inspecting GraphQL ops (`list`, `summary`, `show`, `graphql:req-at`, `schema:*` commands).
- Retailer sync + AI splitting: `itemize` workflow (Walmart/Costco/Amazon → match Monarch txns → categorize with OpenAI → split) and `Monarch-Money-Walmart` 1Password-backed splitter; useful patterns for dry-run, session reuse, dedup.
- TUI/CLI flows: `moneyflow` review-before-commit UX and `monarch-access` CLI/MCP tables/JSON/CSV output provide examples for future CLI docs and MCP parity.

## Observability & safety callouts
- Rate limiting: GraphQL client enforces 250ms min interval, burst guard (5 recent requests), jitter, and queueing (max 3 concurrent) plus retry-with-backoff.
- Caching: per-call cache toggle and TTLs; mutations invalidate; persistent cache in `~/.mm` with optional encryption.
- Error handling: auth errors include CAPTCHA/MFA/IP-block branches; session validation fails closed; `getHistory`/`getBalances` currently degrade to current balance instead of throwing (note in docs).

### Cache invalidation & idempotency (document in reference)
- Reads default to cached unless overridden per call (`GraphQLClient.query` options). Mutations call `invalidateMutationCache`.
- Default TTLs: accounts 5m, categories 30m, transactions 2m, budgets 10m; session 24h in persistent cache.
- Recommend per-domain notes: after account/budget/category/transaction mutations, cache is invalidated; consumers should expect fresh reads.
- Idempotency: no request IDs yet—advise clients to supply `idempotency_key` for MCP composite ops and treat bulk updates as non-idempotent unless dedup keys are added.
- Rate-limit/backoff: retries with exponential backoff, jitter, and `Retry-After` honor for rate limits.

### Error catalog (align output with tool errors)
- Error classes (codes): `AUTH_ERROR` (MFA/CAPTCHA/IP blocked: `MFA_REQUIRED`, `CAPTCHA_REQUIRED`, `IP_BLOCKED`, `SESSION_EXPIRED`), `API_ERROR` (client/server HTTP), `RATE_LIMIT`, `VALIDATION_ERROR`, `NETWORK_ERROR`, `GRAPHQL_ERROR`, `CONFIG_ERROR`.
- Handling: `handleHTTPResponse` maps 401/403/429/4xx/5xx; `handleGraphQLErrors` upgrades auth/MFA; `retryWithBackoff` retries rate-limit, network, and server errors.
- MCP error surface: for tool failures return `{ isError: true, cause, retriable, message, retryAfter?, next? }` where `cause` ∈ `auth|rate_limit|validation|not_found|dependency_down`.

## Gaps to highlight for v2
- Accounts balance history parsing (`recentBalances`) and real per-day history are TODO; `getBalances` currently returns only current balances.
- Domain docs should add request/response samples per method (use `mmtraf` and current GraphQL strings to derive exact schemas).
- MCP mapping not yet defined in this repo; need tool/resource table and formatter examples aligned to that surface.
- Need clear error catalog + status codes, and guidance on cache invalidation per domain (mutations vs reads).
- Document cache invalidation strategy and stateful/idempotent behaviors for bulk operations once finalized (follow MCP design playbook for retries/dedup).
