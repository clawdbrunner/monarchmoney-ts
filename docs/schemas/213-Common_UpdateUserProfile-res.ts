export interface ResponseBody {
    data: Data;
}

export interface Data {
    updateUserProfile: UpdateUserProfile;
    updateMe:          UpdateMe;
    updateMyHousehold: UpdateMyHousehold;
}

export interface UpdateMe {
    user:       User;
    errors:     null;
    __typename: string;
}

export interface User {
    id:         string;
    name:       string;
    __typename: string;
}

export interface UpdateMyHousehold {
    household:  Household;
    errors:     null;
    __typename: string;
}

export interface Household {
    country:    string;
    __typename: string;
}

export interface UpdateUserProfile {
    userProfile: UserProfile;
    errors:      null;
    __typename:  string;
}

export interface UserProfile {
    id:                                   string;
    birthday:                             Date;
    collaboratesOnFinancesDetailed:       string;
    hasSeenCategoriesManagementTour:      boolean;
    aiAssistantOptedInAt:                 Date;
    viewedMarkAsReviewedUpdatesCalloutAt: Date;
    __typename:                           string;
}

