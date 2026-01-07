export interface ResponseBody {
    data: Data;
}

export interface Data {
    subscription: Subscription;
}

export interface Subscription {
    id:                    string;
    paymentSource:         string;
    referralCode:          string;
    isOnFreeTrial:         boolean;
    hasPremiumEntitlement: boolean;
    willCancelAtPeriodEnd: boolean;
    trialEndsAt:           Date;
    activeSponsorship:     null;
    __typename:            string;
}

