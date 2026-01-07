export interface ResponseBody {
    data: Data;
}

export interface Data {
    householdPreferences:             HouseholdPreferences;
    budgetSystem:                     string;
    budgetApplyToFutureMonthsDefault: null;
    __typename:                       string;
}

export interface HouseholdPreferences {
    id:                                  string;
    newTransactionsNeedReview:           boolean;
    uncategorizedTransactionsNeedReview: boolean;
    pendingTransactionsCanBeEdited:      boolean;
    accountGroupOrder:                   string[];
    aiAssistantEnabled:                  boolean;
    llmEnrichmentEnabled:                boolean;
    investmentTransactionsEnabled:       boolean;
    budgetApplyToFutureMonthsDefault:    null;
    hiddenTransactionsBetaEnabled:       boolean;
    collaborationToolsEnabled:           boolean;
    aggDataSharingEnabled:               boolean;
    aiModelTrainingOnUserDataEnabled:    boolean;
    __typename:                          string;
}

