import { Server } from "http";
import { Server as SocketServer} from "socket.io";
import disconnection from "./socket_util/disconnection";
import connection from "./socket_util/connection";
import Message from "./models/messageModel";
import socketAuthMiddleware from "./socket_util/socketAuthMiddleware";

//this contains main socket logic 

const socketSetup = (server:Server)=>{
   const io:SocketServer = new SocketServer(server, {
        cors:{
            origin: process.env.ORIGIN,
            methods:["GET","POST"],
            credentials:true,
        }
   });


   const userSocketMap = new Map();   //to store user<userId,socketId>


   //handle message send logic for p-2-p

   const handleMessage = async ( message:any):Promise<void> => {
   

   try{
    console.log(message);
    const senderSocketId = userSocketMap.get(message.sender);

    const recieverSocketId = userSocketMap.get(message.receiver);

    const createdMessage = await Message.create(message);

    
    const messageData = await Message.findById(createdMessage._id).populate("sender","id email firstName lastName img").populate("receiver","id email firstName lastName img");



    if(recieverSocketId){
        io.to(recieverSocketId).emit("receiveMessage",messageData);
    }

    if(senderSocketId){
        io.to(senderSocketId).emit("receiveMessage",messageData);
    }
   }catch(e:any){
    console.log(e.message);
   }
  
}

    //authentication

    io.use(socketAuthMiddleware);
    //io connection disconnection handling
    
   io.on("connection",(socket:any)=>{

    
      connection(socket,userSocketMap,io);


      socket.on("sendMessage",handleMessage);



      socket.on("disconnect",()=>{
        disconnection(socket,userSocketMap,io);
        console.log(userSocketMap);

       });
   });

   

}

export default socketSetup;