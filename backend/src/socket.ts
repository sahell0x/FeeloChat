import { Server } from "http";
import { Server as SocketServer} from "socket.io";
import disconnection from "./socket_util/disconnection";
import connection from "./socket_util/connection";

const socketSetup = (server:Server)=>{
   const io:SocketServer = new SocketServer(server, {
        cors:{
            origin: process.env.ORIGIN,
            methods:["GET","POST"],
            credentials:true,
        }
   });

   const userSocketMap = new Map();
   
   io.on("connection",(socket)=>{
      connection(socket,userSocketMap);
   });

   io.on("disconnect",(socket)=>{
    disconnection(socket,userSocketMap);
   });


}

export default socketSetup;