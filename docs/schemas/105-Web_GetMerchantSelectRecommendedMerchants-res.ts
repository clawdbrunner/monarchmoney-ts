export interface ResponseBody {
    data: Data;
}

export interface Data {
    recommendedMerchants: RecommendedMerchant[];
}

export interface RecommendedMerchant {
    name:             string;
    source:           string;
    transactionCount: number;
    __typename:       string;
}

