import { Server, Socket } from "socket.io";
import { MessageType } from "../types/socketTypes";
import Message from "../models/messageModel";

const handleMessage = async (
  message: MessageType,
  userSocketMap: Map<string, string>,
  socket: Socket,
  io: Server
): Promise<void> => {
  const userId: string = (socket as any).userId;
  if (userId === message.sender || userId === message.receiver) {
    try {
      const senderSocketId = userSocketMap.get(message.sender);

      const recieverSocketId = userSocketMap.get(message.receiver);

      const createdMessage = await Message.create(message);

      const messageData = await Message.findById(createdMessage._id);

      if (recieverSocketId) {
        io.to(recieverSocketId).emit("receive-message", messageData);
      }

      if (senderSocketId) {
        io.to(senderSocketId).emit("receive-message", messageData);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }
};

export default handleMessage;
