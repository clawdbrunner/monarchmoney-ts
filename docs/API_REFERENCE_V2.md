# Monarch Money SDK v2 – API Reference (captured 2026-01-07)

Source of truth for request/response shapes using live GraphQL traffic (monarch-traffic-2026-01-07T07-57-59-834Z.json). Full inferred TypeScript schemas are stored under `docs/schemas/*.ts` (one pair per operation: `*-req.ts` and `*-res.ts`). Operation indices match the capture file.

## Authentication & Session
- Endpoint: `https://api.monarchmoney.com/graphql` (Token auth header `Authorization: Token <token>`; headers align with web app including `Client-Platform: web`, `device-uuid`).
- Flows:
  - Credential login with optional TOTP (`login` / `multiFactorAuthenticate`); CAPTCHA/MFA/IP-block surfaced via `MonarchAuthError` and related codes.
  - Direct login (`directLogin`) mirrors browser flow; shares session storage.
  - Session persistence at `~/.mm/session.json` (0600; optional encryption via `cacheEncryptionKey`).
  - Env vars: `MONARCH_EMAIL`, `MONARCH_PASSWORD`, `MONARCH_SESSION_TOKEN`, `MONARCH_BASE_URL`, `MONARCH_CACHE_ENCRYPTION_KEY`, `MONARCH_LOG_LEVEL`.
- Rate limiting & retries: client enforces ~250ms min interval + burst guard; `retryWithBackoff` respects `Retry-After` and retries network/5xx/rate limits.

## How to read schemas
- For any operation: see `docs/schemas/<index>-<Operation>-req.ts` for request variables and `docs/schemas/<index>-<Operation>-res.ts` for response types.
- The summaries below list request variables and key top-level response fields for quick reference.

## Accounts & Net Worth
- `Web_GetAccountsPage` (index 4) – vars: `filters`. Response: `hasAccounts`, `accountTypeSummaries[]`, `householdPreferences`.
- `Web_GetAccountsPageRecentBalance` (5) – vars: `startDate`. Response: `accounts[] { id, recentBalances, type, includeInNetWorth }`.
- `Common_GetAggregateSnapshots` (6) – vars: `filters`. Response: `aggregateSnapshots[] { date, balance, assetsBalance, liabilitiesBalance }`.
- `Common_GetDisplayBalanceAtDate` (2) – vars: `date, filters`. Response: `accounts[] { id, displayBalance, includeInNetWorth, type }`.
- `Web_GetAccountTypes` (7) – vars: none. Response: `accountTypes[] { name, display, group, showForSyncedAccounts, possibleSubtypes }`.
- `Common_GetSnapshotsByAccountType` (65) – vars: `startDate, timeframe, filters`. Response: `snapshotsByAccountType[] { accountType, month, balance }; accountTypes[]`.
- `Common_ForceRefreshAccountsQuery` (1) – vars: none. Response: `hasAccountsSyncing`.
- `Common_GetDebtAccountsForMigration` (3) – vars: none. Response: `accounts[]` with balances/flags/icons.
- `Common_GetAggregateSnapshots` (re-used) – see above; also see indices 62/73/80 variants in capture if needed.

## Transactions
- `Web_GetTransactionsList` (20) – vars: `orderBy, limit, filters` (contains transactionVisibility, dates, etc.). Response: `allTransactions { totalCount, totalSelectableCount, results[] }`, `transactionRules[]`.
- `Web_TransactionsFilterQuery` (15) – vars: none. Response: filter metadata collections (`categoryGroups`, `goalsV2`, `merchants`, `accounts`, `householdTransactionTags`, `myHousehold`, `householdPreferences`).
- `Web_GetTransactionFiltersMetadata` (13) – vars: `input`. Response: `transactionFiltersMetadata` with categories, categoryGroups, accounts, merchants, tags, goals, savingsGoals, needsReviewByUser, ownershipSet.
- `Web_GetTransactionsPage` (17) – vars: `filters`. Response: `aggregates[]` with `summary`.
- `Web_GetTransactionsSummaryCard` (11) – vars: `filters`. Response: `allTransactions.totalCount`.
- `Web_MintTransactionsCountQuery` (12) – vars: none. Response: `allMintTransactions.totalCount`.
- `Web_GetDownloadTransactionsSession` (14) – vars: `sessionKey`. Response: `downloadTransactionsSession { sessionKey, status, errorMessage, url }`.
- `GetTransactionDrawer` (107) – vars: `id, redirectPosted`. Response: `getTransaction` full detail (amounts, dates, flags, merchant, category, account, tags, splits, goals) plus `myHousehold`.
- `Common_TransactionSplitQuery` (115) – vars: `id`. Response: `getTransaction` with split-related fields (review status, hide flags, merchant, category, notes).
- `Web_GetMerchantSelectHouseholdMerchants` (104) – vars: `offset, limit, orderBy, search`. Response: `merchants[] { id, name, logoUrl, transactionCount }`.
- `Web_GetMerchantSelectRecommendedMerchants` (105) – vars: `transactionId`. Response: `recommendedMerchants[] { name, source, transactionCount }`.
- `Common_GetEditMerchant` (111) – vars: `merchantId`. Response: `merchant` edit payload (rule counts, recurring stream flags).
- `Web_GoalSelectTransaction` (110) – vars: `transactionId`. Response: `getTransaction { id, account, goal, pending }`.
- `GetTransactionRules` (119) – vars: none. Response: `transactionRules[]` with criteria/actions and metadata.

## Categories & Tags
- `Common_GetCategories` (24) – vars: none. Response: `categoryGroups[]` (group-level budgeting, rollover, categories...) and `categories[]` (name/icon/order/system/excludeFromBudget/budgetVariability/disabled flags).
- `Common_GetHouseholdTransactionTags` (49) – vars: `includeTransactionCount`. Response: `householdTransactionTags[] { id, name, color, order }`.

## Cashflow & Reports
- `Common_GetCashFlowEntityAggregates` (25) – vars: `filters`. Response: grouped aggregates by category/group/merchant and `summary`.
- `Common_GetCashFlowTimeframeAggregates` (26) – vars: `filters`. Response: `byYear`, `byMonth`, `byQuarter` with summary data.
- `Common_GetReportsData` (27) – vars: `includeCategory, includeCategoryGroup, includeMerchant, fillEmptyValues, filters, groupBy, sortBy`. Response: see schema file for detailed report rows (capture has empty data in this run).
- `Web_GetReportConfigurations` (30) – vars: none. Response: `reportConfigurations` (empty in capture).
- `Common_GetBudgetStatus` (189) – vars: none. Response: `budgetStatus { hasBudget, hasTransactions, willCreateBudgetFromEmptyDefaultCategories }`.
- `Common_GetBudgetSettings` (191) – vars: none. Response: `budgetSystem`, `budgetApplyToFutureMonthsDefault`, `flexExpenseRolloverPeriod`.
- `Common_GetJointPlanningData` (193) – vars: `startDate, endDate`. Response: `budgetSystem`, `budgetData` (monthly amounts), `categoryGroups`, `goalsV2`, `savingsGoalMonthlyBudgetAmounts`.

## Goals & Subscriptions
- `Web_GoalsV2` (203) – vars: none. Response: `goalsV2[]` (priority, archivedAt, objective, contributions, balances) and `accountsWithUnallocatedBalancesForGoals`.
- `Common_GetSubscriptionDetails` (118) – vars: none. Response: `subscription { id, paymentSource, referralCode, isOnFreeTrial, hasPremiumEntitlement, willCancelAtPeriodEnd, trialEndsAt, activeSponsorship }`.
- `Common_MigratedToSavingsGoals` (10) – vars: none. Response: `migratedToSavingsGoals` boolean.

## Recurring Transactions
- `RecurringMerchantSearch` (199) – vars: none. Response: `recurringMerchantSearch` (null in capture), `recurringTransactionStreams[]`.
- `Common_GetAggregatedRecurringItems` (200) – vars: `startDate, endDate, filters`. Response: `aggregatedRecurringItems { groups, aggregatedSummary }`.
- `Common_GetAllRecurringTransactionItems` (202) – vars: `filters, includeLiabilities`. Response: `recurringTransactionStreams[] { stream, nextForecastedTransaction, category, account }`.

## Investments & Portfolio
- `Web_GetInvestmentsAccounts` (206) – vars: none. Response: investment accounts (taxable flag, sync status, balances, logos).
- `Web_GetPortfolio` (208) – vars: `portfolioInput`. Response: `portfolio { performance, aggregateHoldings }`.
- `Web_GetAllocation` (210) – vars: `porfolioInput` (typo preserved from capture). Response: `portfolio { allocationSimple, performance }`.
- `Web_GetSecuritiesHistoricalPerformance` (207) – vars: `input`. Response: `securityHistoricalPerformance` (empty in capture).

## Messaging & Advice
- `AdviceQuery_Web` (211) – vars: none. Response: `essentials[]`, `objectives[]`, `adviceItemCategories[]`, `profileQuestionnaire`, `objectivesQuestionnaire`.
- `Common_GetMessageThreads` (212) – vars: none. Response: `messageThreads[]`, `me`, `householdPreferences`.
- `Common_GetMessageThread` (217) – vars: `threadId`. Response: `messageThread { id, subject, hasOutstandingAssistantRequests, messages }`.
- `Common_CreateThreadMutation` (214) – vars: `shouldOmitWelcomeMessage, agentType`. Response: `createMessageThread { messageThread }`.
- `Common_SendMessage` (216) – vars: `input`. Response: `sendMessage { messageThread }`.
- `Common_GetAssistantFeedback` (218) – vars: `threadId`. Response: `assistantFeedbackByThread` (empty in capture).

## User Profile & Preferences
- `Common_UserProfileFlags` (0) – vars: none. Response: `userProfile` flags for tours/whats-new/assistant opt-in.
- `Common_GetHouseholdPreferences` (18) – vars: none. Response: `householdPreferences` (review rules, AI flags, budgeting defaults, investment flags), `budgetSystem`, `budgetApplyToFutureMonthsDefault`.
- `Web_GetUserDismissedRetailSyncBanner` (19) – vars: none. Response: `userHasConfiguredRetailSyncExtension`, `me.profile`.
- `Common_UpdateUserProfile` (213) – vars: `updateMyHouseholdInput, updateProfileInput, updateMeInput`. Response: `updateUserProfile`, `updateMe`, `updateMyHousehold` with `errors`.

## Categories/Tags for Reporting
- `Common_GetCategories` and `Common_GetHouseholdTransactionTags` listed above feed both filtering and budgeting/reporting surfaces.

## Cashflow & Reports (continued)
- `Common_GetCashFlowEntityAggregates` / `Common_GetCashFlowTimeframeAggregates` feed the cashflow pages and reports; see schemas for grouping keys and sums.
- `Common_GetReportsData` supports grouped transaction reports; capture has empty payload but schema shows grouping/sorting inputs.

## Other/Ancillary
- `Common_GetReportsData` (27), `Common_GetReportConfigurations` (30) – reporting support.
- `Web_GetFilteredAccounts` (50) – accounts list with filters (ids, balances, provider info, logos).
- `Common_GetDisplayBalanceAtDate` (2) – point-in-time balance view.
- `Common_GetAggregatedRecurringItems` / `RecurringMerchantSearch` – recurring analysis.
- `Common_GetSpinwheelCreditReport` (201) – credit report liabilities and spinwheel user onboarding status.

## File index for schemas
All generated schemas live under `docs/schemas/`. Examples:
- Requests: `docs/schemas/20-Web_GetTransactionsList-req.ts`
- Responses: `docs/schemas/20-Web_GetTransactionsList-res.ts`
Use the operation name and index from this doc to locate the correct pair.
