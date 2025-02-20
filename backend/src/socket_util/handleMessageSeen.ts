import { Server, Socket } from "socket.io";
import { MessageSeen } from "../types/socketTypes";
import Message from "../models/messageModel";

const handleMessageSeen = async (
  data: MessageSeen,
  userSocketMap: Map<string, string>,
  socket: Socket,
  io: Server
) => {
  try {
    const messageSenderId = data.to;
    const toUserSocketId: string = userSocketMap.get(messageSenderId) as string;
    const userId = (socket as any).userId;
    await Message.updateMany(
      {
        $and: [
          { sender: messageSenderId },
          { receiver: userId },
          { isRead: false },
        ],
      },
      {
        $set: { isRead: true },
      }
    );

    if (toUserSocketId) {
      io.to(toUserSocketId).emit("message-seen", {
        seenBy: userId,
      });
    }
  } catch {}
};

export default handleMessageSeen;
