export interface ResponseBody {
    data: Data;
}

export interface Data {
    transactionRules: TransactionRule[];
}

export interface TransactionRule {
    id:                                   string;
    order:                                number;
    merchantCriteriaUseOriginalStatement: boolean;
    merchantCriteria:                     MerchantCriterion[] | null;
    originalStatementCriteria:            null;
    merchantNameCriteria:                 MerchantCriterion[] | null;
    amountCriteria:                       AmountCriteria | null;
    categoryIds:                          null;
    accountIds:                           string[] | null;
    categories:                           any[];
    accounts:                             Account[];
    criteriaOwnerIsJoint:                 boolean;
    criteriaOwnerUserIds:                 null;
    criteriaOwnerUsers:                   null;
    setMerchantAction:                    null;
    setCategoryAction:                    SetCategoryAction;
    addTagsAction:                        null;
    linkGoalAction:                       null;
    needsReviewByUserAction:              null;
    unassignNeedsReviewByUserAction:      boolean;
    sendNotificationAction:               boolean;
    setHideFromReportsAction:             boolean;
    reviewStatusAction:                   null;
    actionSetOwnerIsJoint:                boolean;
    actionSetOwner:                       null;
    recentApplicationCount:               number;
    lastAppliedAt:                        Date | null;
    splitTransactionsAction:              null;
    __typename:                           TransactionRuleTypename;
}

export enum TransactionRuleTypename {
    TransactionRuleV2 = "TransactionRuleV2",
}

export interface Account {
    id:          string;
    displayName: string;
    icon:        Icon;
    logoUrl:     null | string;
    __typename:  AccountTypename;
}

export enum AccountTypename {
    Account = "Account",
}

export enum Icon {
    CreditCard = "credit-card",
    DollarSign = "dollar-sign",
    FileText = "file-text",
}

export interface AmountCriteria {
    operator:   Operator;
    isExpense:  boolean;
    value:      number;
    valueRange: null;
    __typename: string;
}

export enum Operator {
    Contains = "contains",
    Eq = "eq",
}

export interface MerchantCriterion {
    operator:   Operator;
    value:      string;
    __typename: MerchantCriterionTypename;
}

export enum MerchantCriterionTypename {
    MerchantCriterion = "MerchantCriterion",
}

export interface SetCategoryAction {
    id:         string;
    name:       string;
    icon:       string;
    __typename: SetCategoryActionTypename;
}

export enum SetCategoryActionTypename {
    Category = "Category",
}

