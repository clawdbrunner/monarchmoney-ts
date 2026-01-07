export interface ResponseBody {
    data: Data;
}

export interface Data {
    spinwheelUser:                 DataSpinwheelUser;
    creditReportLiabilityAccounts: CreditReportLiabilityAccount[];
}

export interface CreditReportLiabilityAccount {
    spinwheelLiabilityId:       string;
    liabilityType:              LiabilityType;
    isOpen:                     boolean;
    currentTotalBalance:        string;
    account:                    null;
    description:                string;
    termsFrequency:             TermsFrequency;
    spinwheelUser:              CreditReportLiabilityAccountSpinwheelUser;
    accountType:                AccountType;
    recurringTransactionStream: RecurringTransactionStream | null;
    lastStatement:              LastStatement;
    __typename:                 CreditReportLiabilityAccountTypename;
}

export enum CreditReportLiabilityAccountTypename {
    CreditReportLiabilityAccount = "CreditReportLiabilityAccount",
}

export enum AccountType {
    CreditLine = "CREDIT_LINE",
    Mortgage = "MORTGAGE",
    Open = "OPEN",
    Revolving = "REVOLVING",
}

export interface LastStatement {
    dueDate:    Date;
    __typename: LastStatementTypename;
}

export enum LastStatementTypename {
    LiabilityStatement = "LiabilityStatement",
}

export enum LiabilityType {
    CreditCard = "credit_card",
    HomeLoan = "home_loan",
    MiscellaneousLiability = "miscellaneous_liability",
}

export interface RecurringTransactionStream {
    frequency:     Frequency;
    reviewStatus:  ReviewStatus;
    baseDate:      Date;
    dayOfTheMonth: number | null;
    __typename:    RecurringTransactionStreamTypename;
}

export enum RecurringTransactionStreamTypename {
    RecurringTransactionStream = "RecurringTransactionStream",
}

export enum Frequency {
    Monthly = "monthly",
}

export enum ReviewStatus {
    Ignored = "ignored",
}

export interface CreditReportLiabilityAccountSpinwheelUser {
    id:         string;
    user:       User;
    __typename: SpinwheelUserTypename;
}

export enum SpinwheelUserTypename {
    SpinwheelUser = "SpinwheelUser",
}

export interface User {
    id:                 string;
    name:               Name;
    displayName:        DisplayName;
    profilePictureUrl?: null;
    __typename:         UserTypename;
}

export enum UserTypename {
    User = "User",
}

export enum DisplayName {
    Keith = "Keith",
}

export enum Name {
    KeithHerrington = "Keith Herrington",
}

export enum TermsFrequency {
    Monthly = "MONTHLY",
}

export interface DataSpinwheelUser {
    id:                        string;
    user:                      User;
    onboardingStatus:          string;
    onboardingErrorMessage:    null;
    isBillSyncTrackingEnabled: boolean;
    __typename:                SpinwheelUserTypename;
}

