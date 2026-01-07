export interface ResponseBody {
    data: Data;
}

export interface Data {
    goalsV2:                                 GoalsV2[];
    accountsWithUnallocatedBalancesForGoals: any[];
}

export interface GoalsV2 {
    id:                               string;
    imageStorageProvider:             string;
    imageStorageProviderId:           string;
    priority:                         number;
    archivedAt:                       null;
    objective:                        string;
    plannedMonthlyContribution:       null;
    plannedMonthlyPretaxContribution: null;
    accountAllocations:               any[];
    name:                             string;
    defaultName:                      string;
    targetAmount:                     number;
    startingAmount:                   null;
    currentAmount:                    null;
    completedAt:                      null;
    type:                             string;
    completionPercent:                number;
    __typename:                       string;
}

