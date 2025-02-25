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
  statusOf: string;
};

export type TypingEventData = {
  typingEnvetTo: string;
  isTyping: boolean;
};

export type Expression =
  | ""
  | "sad"
  | "angry"
  | "happy"
  | "disgusted"
  | "fearful"
  | "neutral"
  | "surprised";

export type ExpressionEventData = {
  to: string;
  expression: Expression;
};
