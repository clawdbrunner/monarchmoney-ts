export interface ResponseBody {
    data: Data;
}

export interface Data {
    downloadTransactionsSession: DownloadTransactionsSession;
}

export interface DownloadTransactionsSession {
    sessionKey:   string;
    status:       string;
    errorMessage: null;
    url:          null;
    __typename:   string;
}

