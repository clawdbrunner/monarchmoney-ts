export interface ResponseBody {
    data: Data;
}

export interface Data {
    messageThread: MessageThread;
}

export interface MessageThread {
    id:                              string;
    subject:                         null;
    hasOutstandingAssistantRequests: boolean;
    messages:                        Message[];
    __typename:                      string;
}

export interface Message {
    id:         string;
    threadId:   string;
    createdAt:  Date;
    content:    string;
    user?:      User;
    __typename: string;
    name?:      string;
}

export interface User {
    id:         string;
    __typename: string;
}

