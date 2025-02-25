import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import disconnection from "./socket_util/disconnection";
import connection from "./socket_util/connection";
import socketAuthMiddleware from "./socket_util/socketAuthMiddleware";
import {
  ExpressionEventData,
  IndivisualStatusType,
  MessageSeen,
  MessageType,
  TypingEventData,
} from "./types/socketTypes";
import handleMessageSeen from "./socket_util/handleMessageSeen";
import handleIndivisualStatus from "./socket_util/handleIndivisualStatus";
import handleMessage from "./socket_util/handleMessage";
import handleTyping from "./socket_util/handleTyping";
import handleExpression from "./socket_util/handleExpression";


const socketSetup = (server: Server) => {
  const io: SocketServer = new SocketServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map(); 





  io.use(socketAuthMiddleware);

  io.on("connection", (socket: any) => {
    connection(socket, userSocketMap, io);

    socket.on("send-message", (message:MessageType)=>{
        handleMessage(message,userSocketMap,socket,io);
    });

    socket.on("typing",(typingEventData:TypingEventData)=>{
        handleTyping(typingEventData,userSocketMap,socket,io);
    })

    socket.on("message-seen", (data: MessageSeen) => {
      handleMessageSeen(data, userSocketMap, socket, io);
    });

    socket.on(
      "online-status-new-message",
      (indivisulaStatus: IndivisualStatusType) => {
        handleIndivisualStatus(indivisulaStatus, userSocketMap, socket, io);
      }
    );

    socket.on("expression",(expressionEventData : ExpressionEventData)=>{
          handleExpression(expressionEventData,userSocketMap,socket,io);
    });
    

    socket.on("disconnect", () => {
      disconnection(socket, userSocketMap, io);
      console.log(userSocketMap);
    });
  });
};

export default socketSetup;
