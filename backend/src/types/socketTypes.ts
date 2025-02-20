export type MessageSeen = {
  to: string;
};

export type MessageType = {
  sender: string;

  receiver: string;

  cipherTextForSender: string;

  cipherTextForReceiver: string;

  nonce: string;

  timestamp: string;

  isRead: boolean;
};


export type IndivisualStatusType = {
  statusOf : string,
}