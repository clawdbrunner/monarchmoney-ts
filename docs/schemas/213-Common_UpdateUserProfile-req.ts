export interface RequestBody {
    operationName: string;
    variables:     Variables;
    query:         string;
}

export interface Variables {
    updateMyHouseholdInput: UpdateMInput;
    updateProfileInput:     UpdateProfileInput;
    updateMeInput:          UpdateMInput;
}

export interface UpdateMInput {
}

export interface UpdateProfileInput {
    aiAssistantOptedIn: boolean;
}

