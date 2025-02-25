import { Socket } from "socket.io";
import onlineStatusProvider from "./onlineStatusProvider";

const disconnection = (
  socket: Socket,
  userMap: Map<string, string>,
  io: any
): void => {
  const IS_USER_ONLINE = false;

  const userId = (socket as any).userId;

  if (userId) {
    userMap.delete(userId);
    setTimeout(() => {
      onlineStatusProvider(userId, io, userMap, IS_USER_ONLINE);
    }, 3000);
  }
};

export default disconnection;
