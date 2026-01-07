export interface ResponseBody {
    data: Data;
}

export interface Data {
    hasAccounts:          boolean;
    accountTypeSummaries: AccountTypeSummary[];
    householdPreferences: HouseholdPreferences;
}

export interface AccountTypeSummary {
    type:                Type;
    accounts:            Account[];
    isAsset:             boolean;
    totalDisplayBalance: number;
    __typename:          string;
}

export interface Account {
    id:                       string;
    credential:               Credential | null;
    connectionStatus:         ConnectionStatus | null;
    syncDisabled:             boolean;
    isHidden:                 boolean;
    isAsset:                  boolean;
    includeInNetWorth:        boolean;
    order:                    number;
    type:                     Type;
    displayName:              string;
    displayBalance:           number;
    signedBalance:            number;
    updatedAt:                Date;
    icon:                     Icon;
    logoUrl:                  null | string;
    includeBalanceInNetWorth: boolean;
    displayLastUpdatedAt:     Date;
    limit:                    number | null;
    mask:                     null | string;
    subtype:                  Subtype;
    __typename:               AccountTypename;
    institution:              AccountInstitution | null;
    ownedByUser:              null;
}

export enum AccountTypename {
    Account = "Account",
}

export interface ConnectionStatus {
    connectionStatusCode: string;
    copyTitle:            string;
    inAppSmallCopy:       string;
    inAppCopy:            string;
    helpCenterUrl:        string;
    __typename:           string;
}

export interface Credential {
    id:                             string;
    institution:                    CredentialInstitution;
    __typename:                     CredentialTypename;
    updateRequired:                 boolean;
    dataProvider:                   DataProvider;
    disconnectedFromDataProviderAt: null;
    syncDisabledAt:                 null;
    syncDisabledReason:             null;
}

export enum CredentialTypename {
    Credential = "Credential",
}

export enum DataProvider {
    AppleFinanceKit = "APPLE_FINANCE_KIT",
    Finicity = "FINICITY",
    MX = "MX",
    Plaid = "PLAID",
}

export interface CredentialInstitution {
    id:         string;
    name:       string;
    __typename: InstitutionTypename;
}

export enum InstitutionTypename {
    Institution = "Institution",
}

export enum Icon {
    Car = "car",
    CreditCard = "credit-card",
    DollarSign = "dollar-sign",
    FileText = "file-text",
    Home = "home",
    TrendingUp = "trending-up",
}

export interface AccountInstitution {
    id:                       string;
    logo:                     null | string;
    name:                     string;
    status:                   TransactionsStatusEnum | null;
    plaidStatus:              PlaidStatus | null;
    newConnectionsDisabled:   boolean;
    hasIssuesReported:        boolean;
    url:                      string;
    hasIssuesReportedMessage: string;
    transactionsStatus:       TransactionsStatusEnum | null;
    balanceStatus:            null;
    __typename:               InstitutionTypename;
}

export interface PlaidStatus {
    identity?:             Auth;
    item_logins:           Auth;
    liabilities?:          Auth;
    liabilities_updates?:  Auth;
    transactions_updates?: Auth;
    auth?:                 Auth;
    investments_updates?:  Auth;
    investments?:          Auth;
    health_incidents?:     HealthIncident[];
}

export interface Auth {
    status:             TransactionsStatusEnum;
    breakdown:          Breakdown;
    last_status_change: Date;
}

export interface Breakdown {
    success:           number;
    error_plaid:       number;
    error_institution: number;
    refresh_interval?: RefreshInterval;
}

export enum RefreshInterval {
    Normal = "NORMAL",
    Stopped = "STOPPED",
}

export enum TransactionsStatusEnum {
    Degraded = "DEGRADED",
    Down = "DOWN",
    Healthy = "HEALTHY",
}

export interface HealthIncident {
    title:            Title;
    end_date:         Date | null;
    start_date:       Date;
    incident_updates: IncidentUpdate[];
}

export interface IncidentUpdate {
    status:       IncidentUpdateStatus;
    description:  string;
    updated_date: Date;
}

export enum IncidentUpdateStatus {
    Investigating = "INVESTIGATING",
    Resolved = "RESOLVED",
    Scheduled = "SCHEDULED",
}

export enum Title {
    FinancialDataAccessIssue = "Financial Data Access Issue",
    RegularUpdatesAreDelayedForAmericanExpress = "Regular Updates Are Delayed for American Express",
    USBankScheduledMaintenance = "US Bank Scheduled Maintenance",
    VenmoConnectivity = "\tVenmo Connectivity",
}

export interface Subtype {
    display:    string;
    __typename: SubtypeTypename;
}

export enum SubtypeTypename {
    AccountSubtype = "AccountSubtype",
}

export interface Type {
    name:       Name;
    display:    AccountGroupOrder;
    __typename: TypeTypename;
    group?:     string;
}

export enum TypeTypename {
    AccountType = "AccountType",
}

export enum AccountGroupOrder {
    Cash = "Cash",
    CreditCards = "Credit Cards",
    Investments = "Investments",
    Loans = "Loans",
    RealEstate = "Real Estate",
    Vehicles = "Vehicles",
}

export enum Name {
    Brokerage = "brokerage",
    Credit = "credit",
    Depository = "depository",
    Loan = "loan",
    RealEstate = "real_estate",
    Vehicle = "vehicle",
}

export interface HouseholdPreferences {
    id:                        string;
    accountGroupOrder:         AccountGroupOrder[];
    collaborationToolsEnabled: boolean;
    __typename:                string;
}

