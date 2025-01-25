import { Server } from "http";
import { Server as SocketServer} from "socket.io";
import disconnection from "./socket_util/disconnection";
import connection from "./socket_util/connection";
import Message from "./models/messageModel";

const socketSetup = (server:Server)=>{
   const io:SocketServer = new SocketServer(server, {
        cors:{
            origin: process.env.ORIGIN,
            methods:["GET","POST"],
            credentials:true,
        }
   });

   const userSocketMap = new Map();

   const handleMessage = async ( message):Promise<void> => {
    
    const senderSocketId = userSocketMap.get(message.sender);

    const recieverSocketId = userSocketMap.get(message.receiver);

    const createdMessage = await Message.create(message);

    const messageData = await Message.findById(createdMessage._id).populate("sender","id email firstName lastName img").populate("reciever","id email firstName lastName img");

    if(recieverSocketId){
        io.to(recieverSocketId).emit("recieveMessage",messageData);
    }

    if(senderSocketId){
        io.to(senderSocketId).emit("recieveMessage",messageData);
    }
  
}
   
   io.on("connection",(socket)=>{
      connection(socket,userSocketMap);

      socket.on("disconnect",()=>{
        disconnection(socket,userSocketMap);
       });
   });

   


}

export default socketSetup;