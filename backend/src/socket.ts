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

   const handleMessage = async ( message:any):Promise<void> => {
   
    console.log("this is message",message);

   try{
    const senderSocketId = userSocketMap.get(message.sender);

    const recieverSocketId = userSocketMap.get(message.receiver);

    const createdMessage = await Message.create(message);

    const messageData = await Message.findById(createdMessage._id).populate("sender","id email firstName lastName img").populate("receiver","id email firstName lastName img");


    

    if(recieverSocketId){
        io.to(recieverSocketId).emit("receiveMessage",messageData);
    }

    if(senderSocketId){
        console.log("message sent to the client");
        io.to(senderSocketId).emit("receiveMessage",messageData);
    }
   }catch(e:any){
    console.log("inside the cath");
    console.log(e.message);
   }
  
}
   
   io.on("connection",(socket)=>{
      connection(socket,userSocketMap);

      socket.on("sendMessage",handleMessage);

      socket.on("disconnect",()=>{
        disconnection(socket,userSocketMap);
       });
   });

   


}

export default socketSetup;