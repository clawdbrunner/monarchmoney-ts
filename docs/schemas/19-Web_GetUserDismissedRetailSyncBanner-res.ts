export interface ResponseBody {
    data: Data;
}

export interface Data {
    userHasConfiguredRetailSyncExtension: boolean;
    me:                                   Me;
}

export interface Me {
    id:         string;
    profile:    Profile;
    __typename: string;
}

export interface Profile {
    id:                                string;
    dismissedRetailSyncBanner:         boolean;
    dismissedRetailSyncTargetBannerAt: Date;
    __typename:                        string;
}

