export interface ResponseBody {
    data: Data;
}

export interface Data {
    essentials:              Essential[];
    objectives:              Essential[];
    adviceItemCategories:    Category[];
    profileQuestionnaire:    ProfileQuestionnaire;
    objectivesQuestionnaire: ObjectivesQuestionnaire;
}

export interface Category {
    name:         string;
    displayName:  string;
    description?: string;
    __typename:   AdviceItemCategoryTypename;
    color?:       string;
}

export enum AdviceItemCategoryTypename {
    AdviceItemCategory = "AdviceItemCategory",
}

export interface Essential {
    id:                string;
    title:             string;
    description:       string;
    category:          Category;
    numTasksCompleted: number;
    numTasksRemaining: number;
    numTasks:          number;
    completedAt:       Date | null;
    __typename:        EssentialTypename;
}

export enum EssentialTypename {
    AdviceItem = "AdviceItem",
}

export interface ObjectivesQuestionnaire {
    firstQuestion: FirstQuestion;
    __typename:    string;
}

export interface FirstQuestion {
    name:       string;
    __typename: string;
}

export interface ProfileQuestionnaire {
    state:         State;
    firstQuestion: FirstQuestion;
    __typename:    string;
}

export interface State {
    numQuestionsAnswered: number;
    completed:            boolean;
    __typename:           string;
}

