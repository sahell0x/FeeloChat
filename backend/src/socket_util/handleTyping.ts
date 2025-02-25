import { Server, Socket } from "socket.io";
import {TypingEventData } from "../types/socketTypes";

const handleTyping = (
  typingEventData: TypingEventData,
  userSocketMap: Map<string, string>,
  socket: Socket,
  io: Server
) => {

  const contactId: string = typingEventData.typingEnvetTo;
  const userId = (socket as any).userId;
  const IS_TYPING = typingEventData.isTyping;

  const contactSocketId: string = userSocketMap.get(contactId) as string;

  const userSocketId: string = userSocketMap.get(userId) as string;


  if (contactSocketId && userSocketId) {
    const typingData: Record<string, boolean> = {};

    typingData[userId] = IS_TYPING;

    io.to(contactSocketId).emit("typing", typingData);
  }
};

export default handleTyping;
