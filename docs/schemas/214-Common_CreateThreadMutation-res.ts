export interface ResponseBody {
    data: Data;
}

export interface Data {
    createMessageThread: CreateMessageThread;
}

export interface CreateMessageThread {
    messageThread: MessageThread;
    __typename:    string;
}

export interface MessageThread {
    id:         string;
    __typename: string;
}

