export interface ResponseBody {
    data: Data;
}

export interface Data {
    sendMessage: SendMessage;
}

export interface SendMessage {
    messageThread: MessageThread;
    __typename:    string;
}

export interface MessageThread {
    id:                string;
    lastMessageSentAt: Date;
    __typename:        string;
}

