import { Server, Socket } from "socket.io";
import { IndivisualStatusType } from "../types/socketTypes";

const handleIndivisualStatus = (
  indivisulaStatus: IndivisualStatusType,
  userSocketMap: Map<string, string>,
  socket: Socket,
  io: Server
) => {
  const contactId: string = indivisulaStatus.statusOf;
  const userId = (socket as any).userId;
  const IS_ONLINE = true;

  const contactSocketId: string = userSocketMap.get(contactId) as string;

  const userSocketId: string = userSocketMap.get(userId) as string;

  if (contactSocketId && userSocketId) {
    const statusData: Record<string, boolean> = {};

    statusData[contactId] = IS_ONLINE;

    io.to(userSocketId).emit("online-status-new-message", statusData);
  }
};

export default handleIndivisualStatus;
