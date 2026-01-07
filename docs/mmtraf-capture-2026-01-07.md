# Traffic Capture Schemas (2026-01-07)

Source file: monarch-traffic-2026-01-07T07-57-59-834Z.json (first occurrence per GraphQL operation). Summary-first only; derive exact types with `mmtraf schema:req-at`/`schema:res-at` using the listed index.

## Common_UserProfileFlags (index 0)
- Request vars: none
- Response (root fields): userProfile: object: { id, aiAssistantOptedInAt, dismissedTransferAccountDataWalkthroughAt, dismissedTransactionsListUpdatesTourAt, dismissedYearlyReviewAt, hasDismissedWhatsNewAt, hasSeenCategoriesManagementTour, hasSeenWeeklyReviewTour, viewedMarkAsReviewedUpdatesCalloutAt, hasHiddenReferralProgramPrompts … }

## Common_ForceRefreshAccountsQuery (index 1)
- Request vars: none
- Response (root fields): hasAccountsSyncing: boolean

## Common_GetDisplayBalanceAtDate (index 2)
- Request vars: date, filters
- Response (root fields): accounts: array of objects: { id, displayBalance, includeInNetWorth, type, __typename }

## Common_GetDebtAccountsForMigration (index 3)
- Request vars: none
- Response (root fields): accounts: array of objects: { id, displayName, displayBalance, icon, logoUrl, includeInNetWorth, isHidden, displayLastUpdatedAt … }

## Web_GetAccountsPage (index 4)
- Request vars: filters
- Response (root fields): hasAccounts: boolean; accountTypeSummaries: array of objects: { type, accounts, isAsset, totalDisplayBalance, __typename }; householdPreferences: object: { id, accountGroupOrder, collaborationToolsEnabled, __typename }

## Web_GetAccountsPageRecentBalance (index 5)
- Request vars: startDate
- Response (root fields): accounts: array of objects: { id, recentBalances, type, includeInNetWorth, __typename }

## Common_GetAggregateSnapshots (index 6)
- Request vars: filters
- Response (root fields): aggregateSnapshots: array of objects: { date, balance, assetsBalance, liabilitiesBalance, __typename }

## Web_GetAccountTypes (index 7)
- Request vars: none
- Response (root fields): accountTypes: array of objects: { name, display, group, showForSyncedAccounts, possibleSubtypes, __typename }

## Common_MigratedToSavingsGoals (index 10)
- Request vars: none
- Response (root fields): migratedToSavingsGoals: boolean

## Web_GetTransactionsSummaryCard (index 11)
- Request vars: filters
- Response (root fields): allTransactions: object: { totalCount, __typename }

## Web_MintTransactionsCountQuery (index 12)
- Request vars: none
- Response (root fields): allMintTransactions: object: { totalCount, __typename }

## Web_GetTransactionFiltersMetadata (index 13)
- Request vars: input
- Response (root fields): transactionFiltersMetadata: object: { categories, categoryGroups, accounts, merchants, tags, goals, savingsGoals, needsReviewByUser, ownershipSet, __typename }

## Web_GetDownloadTransactionsSession (index 14)
- Request vars: sessionKey
- Response (root fields): downloadTransactionsSession: object: { sessionKey, status, errorMessage, url, __typename }

## Web_TransactionsFilterQuery (index 15)
- Request vars: none
- Response (root fields): categoryGroups: array of objects: { id, name, order, categories, __typename }; goalsV2: array of objects: { id, name, imageStorageProvider, imageStorageProviderId, archivedAt, priority, __typename }; savingsGoals: array (empty); merchants: array of objects: { id, name, transactionCount, logoUrl, __typename }; accounts: array of objects: { id, displayName, logoUrl, icon, type, __typename }; householdTransactionTags: array of objects: { id, name, order, color, __typename }; myHousehold: object: { id, users, __typename }; householdPreferences: object: { accountGroupOrder, collaborationToolsEnabled, __typename }

## Web_GetTransactionsPage (index 17)
- Request vars: filters
- Response (root fields): aggregates: array of objects: { summary, __typename }

## Common_GetHouseholdPreferences (index 18)
- Request vars: none
- Response (root fields): householdPreferences: object: { id, newTransactionsNeedReview, uncategorizedTransactionsNeedReview, pendingTransactionsCanBeEdited, accountGroupOrder, aiAssistantEnabled, llmEnrichmentEnabled, investmentTransactionsEnabled, budgetApplyToFutureMonthsDefault, hiddenTransactionsBetaEnabled … }; budgetSystem: string; budgetApplyToFutureMonthsDefault: null; __typename: string

## Web_GetUserDismissedRetailSyncBanner (index 19)
- Request vars: none
- Response (root fields): userHasConfiguredRetailSyncExtension: boolean; me: object: { id, profile, __typename }

## Web_GetTransactionsList (index 20)
- Request vars: orderBy, limit, filters
- Response (root fields): allTransactions: object: { totalCount, totalSelectableCount, results, __typename }; transactionRules: array of objects: { id, __typename }

## Common_GetCategories (index 24)
- Request vars: none
- Response (root fields): categoryGroups: array of objects: { id, name, order, type, groupLevelBudgetingEnabled, budgetVariability, rolloverPeriod, categories … }; categories: array of objects: { id, name, order, icon, isSystemCategory, excludeFromBudget, budgetVariability, isDisabled … }

## Common_GetCashFlowEntityAggregates (index 25)
- Request vars: filters
- Response (root fields): byCategory: array of objects: { groupBy, summary, __typename }; byCategoryGroup: array of objects: { groupBy, summary, __typename }; byMerchant: array of objects: { groupBy, summary, __typename }; summary: array of objects: { summary, __typename }

## Common_GetCashFlowTimeframeAggregates (index 26)
- Request vars: filters
- Response (root fields): byYear: array of objects: { groupBy, summary, __typename }; byMonth: array of objects: { groupBy, summary, __typename }; byQuarter: array of objects: { groupBy, summary, __typename }

## Common_GetReportsData (index 27)
- Request vars: includeCategory, includeCategoryGroup, includeMerchant, fillEmptyValues, filters, groupBy, sortBy
- Response (root fields): n/a

## Web_GetReportConfigurations (index 30)
- Request vars: none
- Response (root fields): reportConfigurations: array (empty)

## Common_GetHouseholdTransactionTags (index 49)
- Request vars: includeTransactionCount
- Response (root fields): householdTransactionTags: array of objects: { id, name, color, order, __typename }

## Web_GetFilteredAccounts (index 50)
- Request vars: filters
- Response (root fields): accounts: array of objects: { id, createdAt, displayName, displayBalance, displayLastUpdatedAt, dataProvider, icon, logoUrl … }

## Common_GetSnapshotsByAccountType (index 65)
- Request vars: startDate, timeframe, filters
- Response (root fields): snapshotsByAccountType: array of objects: { accountType, month, balance, __typename }; accountTypes: array of objects: { name, group, __typename }

## Web_GetMerchantSelectHouseholdMerchants (index 104)
- Request vars: offset, limit, orderBy, search
- Response (root fields): merchants: array of objects: { id, name, logoUrl, transactionCount, __typename }

## Web_GetMerchantSelectRecommendedMerchants (index 105)
- Request vars: transactionId
- Response (root fields): recommendedMerchants: array of objects: { name, source, transactionCount, __typename }

## GetTransactionDrawer (index 107)
- Request vars: id, redirectPosted
- Response (root fields): getTransaction: object: { id, amount, pending, isRecurring, date, originalDate, hideFromReports, needsReview, reviewedAt, reviewedByUser … }; myHousehold: object: { id, users, __typename }

## Web_GoalSelectTransaction (index 110)
- Request vars: transactionId
- Response (root fields): getTransaction: object: { id, account, goal, pending, __typename }

## Common_GetEditMerchant (index 111)
- Request vars: merchantId
- Response (root fields): merchant: object: { id, name, logoUrl, transactionCount, ruleCount, canBeDeleted, hasActiveRecurringStreams, recurringTransactionStream, __typename }

## Common_TransactionSplitQuery (index 115)
- Request vars: id
- Response (root fields): getTransaction: object: { id, amount, reviewedAt, needsReview, reviewStatus, hideFromReports, dataProviderDescription, notes, category, merchant … }

## Common_GetSubscriptionDetails (index 118)
- Request vars: none
- Response (root fields): subscription: object: { id, paymentSource, referralCode, isOnFreeTrial, hasPremiumEntitlement, willCancelAtPeriodEnd, trialEndsAt, activeSponsorship, __typename }

## GetTransactionRules (index 119)
- Request vars: none
- Response (root fields): transactionRules: array of objects: { id, order, merchantCriteriaUseOriginalStatement, merchantCriteria, originalStatementCriteria, merchantNameCriteria, amountCriteria, categoryIds … }

## Common_GetBudgetStatus (index 189)
- Request vars: none
- Response (root fields): budgetStatus: object: { hasBudget, hasTransactions, willCreateBudgetFromEmptyDefaultCategories, __typename }

## Common_GetBudgetSettings (index 191)
- Request vars: none
- Response (root fields): budgetSystem: string; budgetApplyToFutureMonthsDefault: null; flexExpenseRolloverPeriod: null

## Common_GetJointPlanningData (index 193)
- Request vars: startDate, endDate
- Response (root fields): budgetSystem: string; budgetData: object: { monthlyAmountsByCategory, monthlyAmountsByCategoryGroup, monthlyAmountsForFlexExpense, totalsByMonth, __typename }; categoryGroups: array of objects: { id, name, order, type, budgetVariability, updatedAt, groupLevelBudgetingEnabled, categories … }; goalsV2: array of objects: { id, name, archivedAt, completedAt, priority, imageStorageProvider, imageStorageProviderId, plannedContributions … }; savingsGoalMonthlyBudgetAmounts: array (empty)

## RecurringMerchantSearch (index 199)
- Request vars: none
- Response (root fields): recurringMerchantSearch: null; recurringTransactionStreams: array of objects: { stream, __typename }

## Common_GetAggregatedRecurringItems (index 200)
- Request vars: startDate, endDate, filters
- Response (root fields): aggregatedRecurringItems: object: { groups, aggregatedSummary, __typename }

## Common_GetSpinwheelCreditReport (index 201)
- Request vars: none
- Response (root fields): spinwheelUser: object: { id, user, onboardingStatus, onboardingErrorMessage, isBillSyncTrackingEnabled, __typename }; creditReportLiabilityAccounts: array of objects: { spinwheelLiabilityId, liabilityType, isOpen, currentTotalBalance, account, description, termsFrequency, spinwheelUser … }

## Common_GetAllRecurringTransactionItems (index 202)
- Request vars: filters, includeLiabilities
- Response (root fields): recurringTransactionStreams: array of objects: { stream, nextForecastedTransaction, category, account, __typename }

## Web_GoalsV2 (index 203)
- Request vars: none
- Response (root fields): goalsV2: array of objects: { id, imageStorageProvider, imageStorageProviderId, priority, archivedAt, objective, plannedMonthlyContribution, plannedMonthlyPretaxContribution … }; accountsWithUnallocatedBalancesForGoals: array (empty)

## Web_GetInvestmentsAccounts (index 206)
- Request vars: none
- Response (root fields): accounts: array of objects: { id, displayName, isTaxable, icon, order, logoUrl, includeInNetWorth, syncDisabled … }

## Web_GetSecuritiesHistoricalPerformance (index 207)
- Request vars: input
- Response (root fields): securityHistoricalPerformance: array (empty)

## Web_GetPortfolio (index 208)
- Request vars: portfolioInput
- Response (root fields): portfolio: object: { performance, aggregateHoldings, __typename }

## Web_GetAllocation (index 210)
- Request vars: porfolioInput
- Response (root fields): portfolio: object: { allocationSimple, performance, __typename }

## AdviceQuery_Web (index 211)
- Request vars: none
- Response (root fields): essentials: array of objects: { id, title, description, category, numTasksCompleted, numTasksRemaining, numTasks, completedAt … }; objectives: array of objects: { id, title, description, category, numTasksCompleted, numTasksRemaining, numTasks, completedAt … }; adviceItemCategories: array of objects: { name, displayName, description, __typename }; profileQuestionnaire: object: { state, firstQuestion, __typename }; objectivesQuestionnaire: object: { firstQuestion, __typename }

## Common_GetMessageThreads (index 212)
- Request vars: none
- Response (root fields): messageThreads: array of objects: { id, subject, createdAt, lastMessageSentAt, hasOutstandingAssistantRequests, __typename }; me: object: { id, profile, __typename }; householdPreferences: object: { id, aiAssistantEnabled, __typename }

## Common_UpdateUserProfile (index 213)
- Request vars: updateMyHouseholdInput, updateProfileInput, updateMeInput
- Response (root fields): updateUserProfile: object: { userProfile, errors, __typename }; updateMe: object: { user, errors, __typename }; updateMyHousehold: object: { household, errors, __typename }

## Common_CreateThreadMutation (index 214)
- Request vars: shouldOmitWelcomeMessage, agentType
- Response (root fields): createMessageThread: object: { messageThread, __typename }

## Common_SendMessage (index 216)
- Request vars: input
- Response (root fields): sendMessage: object: { messageThread, __typename }

## Common_GetMessageThread (index 217)
- Request vars: threadId
- Response (root fields): messageThread: object: { id, subject, hasOutstandingAssistantRequests, messages, __typename }

## Common_GetAssistantFeedback (index 218)
- Request vars: threadId
- Response (root fields): assistantFeedbackByThread: array (empty)

