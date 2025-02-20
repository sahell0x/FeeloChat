import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import disconnection from "./socket_util/disconnection";
import connection from "./socket_util/connection";
import Message from "./models/messageModel";
import socketAuthMiddleware from "./socket_util/socketAuthMiddleware";
import {
  IndivisualStatusType,
  MessageSeen,
  MessageType,
} from "./types/socketTypes";
import handleMessageSeen from "./socket_util/handleMessageSeen";

//this contains main socket logic

const socketSetup = (server: Server) => {
  const io: SocketServer = new SocketServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map(); //to store user<userId,socketId>

  //handle message send logic for p-2-p

  const handleMessage = async (message: MessageType): Promise<void> => {
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
  };

  //authentication

  io.use(socketAuthMiddleware);
  //io connection disconnection handling

  io.on("connection", (socket: any) => {
    connection(socket, userSocketMap, io);

    socket.on("sendMessage", handleMessage);

    socket.on("message-seen", (data: MessageSeen) => {
      handleMessageSeen(data, userSocketMap, socket, io);
    });

    socket.on(
      "online-status-new-message",
      (indivisulaStatus: IndivisualStatusType) => {
        const contactId: string = indivisulaStatus.statusOf;
        const userId = (socket as any).userId;
        const IS_ONLINE = true;

        const contactSocketId: string = userSocketMap.get(contactId);

        const userSocketId: string = userSocketMap.get(userId);

        console.log("sending status for ", contactSocketId, userSocketId);

        if (contactSocketId && userSocketId) {
          const statusData: Record<string, boolean> = {};

          statusData[contactId] = IS_ONLINE;

          io.to(userSocketId).emit("online-status-new-message", statusData);
        }
      }
    );

    socket.on("disconnect", () => {
      disconnection(socket, userSocketMap, io);
      console.log(userSocketMap);
    });
  });
};

export default socketSetup;
