export interface ResponseBody {
    data: Data;
}

export interface Data {
    messageThreads:       MessageThread[];
    me:                   Me;
    householdPreferences: HouseholdPreferences;
}

export interface HouseholdPreferences {
    id:                 string;
    aiAssistantEnabled: boolean;
    __typename:         string;
}

export interface Me {
    id:         string;
    profile:    Profile;
    __typename: string;
}

export interface Profile {
    id:                   string;
    aiAssistantOptedInAt: Date;
    __typename:           string;
}

export interface MessageThread {
    id:                              string;
    subject:                         string;
    createdAt:                       Date;
    lastMessageSentAt:               Date;
    hasOutstandingAssistantRequests: boolean;
    __typename:                      string;
}

