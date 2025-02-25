import { Socket } from "socket.io";
import onlineStatusProvider from "./onlineStatusProvider";



const connection = (
  socket: Socket,
  userMap: Map<string, string>,
  io: any
): void => {
  const IS_USER_ONLINE = true; 
  const userId = (socket as any).userId;
  console.log((socket as any).userId);

  console.log("connected : ", userId);

  if (userId) {
    userMap.set(userId, socket.id);
    setTimeout(()=>{
      onlineStatusProvider(userId, io, userMap, IS_USER_ONLINE);
    },3000);
  }
};

export default connection;
