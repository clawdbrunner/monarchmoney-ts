export interface ResponseBody {
    data: Data;
}

export interface Data {
    userProfile: UserProfile;
}

export interface UserProfile {
    id:                                          string;
    aiAssistantOptedInAt:                        Date;
    dismissedTransferAccountDataWalkthroughAt:   null;
    dismissedTransactionsListUpdatesTourAt:      null;
    dismissedYearlyReviewAt:                     null;
    hasDismissedWhatsNewAt:                      Date;
    hasSeenCategoriesManagementTour:             boolean;
    hasSeenWeeklyReviewTour:                     boolean;
    viewedMarkAsReviewedUpdatesCalloutAt:        Date;
    hasHiddenReferralProgramPrompts:             null;
    dismissedOwnershipWalkthroughAt:             Date;
    finishedOwnershipSetupAt:                    null;
    displayOwnershipOnTransactionsList:          null;
    dismissedFinancialProfileBannerForMemberIds: null;
    __typename:                                  string;
}

